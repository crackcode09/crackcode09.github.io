// Sätteri (Astro 7's Markdown engine) HTML-tree plugin: an image on its own line in a
// field note becomes a numbered figure.
//
//   ![alt text for screen readers](./images/spc.png "what the image shows")
//   → <figure class="fig"><img …><figcaption><span class="fig-num">fig. 01</span> · what the image shows</figcaption></figure>
//
// The Markdown title (the quoted text) becomes the caption; no title, no caption.
// Start the title with "photo:" to give a photo the site's grayscale treatment.
const isImg = (n) => n.type === 'element' && n.tagName === 'img';
const isBlank = (n) => n.type === 'text' && !n.value.trim();

// A factory, so figure numbers restart for every document.
export default function figures() {
  let count = 0;
  return {
    name: 'nidhy-figures',
    element: {
      filter: ['p'],
      visit(node, ctx) {
        const kids = (node.children || []).filter((k) => !isBlank(k));
        if (kids.length !== 1 || !isImg(kids[0])) return;
        const img = kids[0];
        const { title, ...props } = img.properties || {};
        let caption = typeof title === 'string' ? title.trim() : '';
        const photo = /^photo:\s*/i.test(caption);
        if (photo) caption = caption.replace(/^photo:\s*/i, '');
        const children = [{ type: 'element', tagName: 'img', properties: props, children: [] }];
        if (caption) {
          const n = String(++count).padStart(2, '0'); // only captioned figures are numbered
          children.push({
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: [
              { type: 'element', tagName: 'span', properties: { className: ['fig-num'] }, children: [{ type: 'text', value: `fig. ${n}` }] },
              { type: 'text', value: ` · ${caption}` },
            ],
          });
        }
        ctx.replaceNode(node, {
          type: 'element',
          tagName: 'figure',
          properties: { className: photo ? ['fig', 'fig--photo'] : ['fig'] },
          children,
        });
      },
    },
  };
}
