
// src/services/reviewsCsv.ts
export type Review = {
  name: string;
  text: string;
  rating: number; // 1..5
  city?: string;
  service?: string;
};

function normalizeHeader(h: string) {
  return h
    .toLowerCase()
    .replace(/\s*\/\s*/g, " ")   // "City / Location" -> "City Location"
    .replace(/\s+/g, " ")        // colapsa espacios
    .trim();
}

/**
 * Parser CSV robusto:
 * - respeta comas y saltos de línea dentro de campos entrecomillados
 * - soporta comillas escapadas ("")
 */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let curField = "";
  let curRow: string[] = [];
  let inQuotes = false;

  // Quita BOM si viene
  if (text.charCodeAt(0) === 0xfeff) {
    text = text.slice(1);
  }

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (ch === '"') {
      // Comillas escapadas ("")
      const next = text[i + 1];
      if (inQuotes && next === '"') {
        curField += '"';
        i++; // saltar la segunda comilla
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      curRow.push(curField);
      curField = "";
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      // Fin de línea (maneja CRLF/LF)
      if (ch === "\r" && text[i + 1] === "\n") i++; // saltar LF en CRLF
      curRow.push(curField);
      rows.push(curRow);
      curRow = [];
      curField = "";
    } else {
      curField += ch;
    }
  }

  // último campo / fila si el archivo no termina con newline
  curRow.push(curField);
  rows.push(curRow);

  // Elimina filas vacías al final
  while (rows.length && rows[rows.length - 1].every((c) => c === "")) {
    rows.pop();
  }
  return rows;
}

function clampRating(n: any) {
  const x = Number(n);
  if (!Number.isFinite(x)) return 5;
  return Math.max(1, Math.min(5, Math.round(x)));
}

/**
 * Mapea una fila a Review usando los nombres de encabezado.
 * Acepta sinónimos por si cambias los textos en el Form.
 */
export async function fetchReviewsFromCsv(csvUrl: string): Promise<Review[]> {
  const res = await fetch(csvUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`CSV fetch failed: ${res.status} ${res.statusText}`);
  const csv = await res.text();

  const rows = parseCsv(csv);
  if (!rows.length) return [];

  const header = rows[0].map((h) => normalizeHeader(h));
  const data = rows.slice(1);

  // Busca índices por header (con varias opciones)
  const idxName = header.findIndex((h) =>
    /^(full name|name)$/.test(h)
  );
  const idxCity = header.findIndex((h) =>
    /^(city location|city|location)$/.test(h)
  );
  const idxService = header.findIndex((h) =>
    /^(which service did you hire\?|service)$/.test(h)
  );
  const idxRating = header.findIndex((h) =>
    /^(how would you rate your experience\?|rating|stars)$/.test(h)
  );
  const idxText = header.findIndex((h) =>
    /^(please share your feedback|review|comment|feedback)$/.test(h)
  );

  return data
    .map((cols) => {
      const name = (idxName >= 0 ? cols[idxName] : "").trim();
      const text = (idxText >= 0 ? cols[idxText] : "").trim();
      const ratingRaw = idxRating >= 0 ? cols[idxRating] : "5";
      const city = idxCity >= 0 ? cols[idxCity]?.trim() : undefined;
      const service = idxService >= 0 ? cols[idxService]?.trim() : undefined;

      if (!name && !text) return null;
      return {
        name: name || "Anonymous",
        text,
        rating: clampRating(ratingRaw),
        city,
        service,
      } as Review;
    })
    .filter((x): x is Review => !!x);
}
