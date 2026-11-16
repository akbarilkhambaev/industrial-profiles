/** Серверный вывод структурированных данных: разметка попадает в исходный HTML, а не появляется после гидрации. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" экранируется, чтобы строка вроде "</script>" в данных не могла закрыть тег.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
