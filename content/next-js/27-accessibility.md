# Accessibility and Semantic UI

Use native HTML: links for navigation, buttons for actions, headings for structure, labels for inputs, and lists for collections. Every control must be keyboard reachable and usable, with visible focus indicators. Avoid trapping focus except in correctly implemented modal interactions.

Make loading, errors, success messages, and streamed regions understandable to assistive technology. Use ARIA only when native semantics are insufficient; incorrect ARIA can worsen accessibility. Check contrast, zoom, reduced motion, reading order, and whether sticky headers obscure focus. Automated scans help but cannot assess every workflow; combine them with keyboard and screen-reader testing.

**Practice:** Audit book search and progress forms for labels, heading order, link names, focus, errors, contrast, zoom, and motion.
