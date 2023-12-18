// Updated main.js
function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

/// Updated main.js
// Updated main.js
// Updated main.js
// Updated main.js
// Updated main.js
function updateFont() {
    const fontSize = document.getElementById('fontSize').value || '16';
    const fontFamily = document.getElementById('fontFamily').value || 'Arial';
    const fontColor = document.getElementById('fontColor').value || '#000000';

    const editor = document.getElementById('editor');
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontSize = `${fontSize}px`;
        span.style.fontFamily = fontFamily;
        span.style.color = fontColor;

        // Check if the selection is collapsed (cursor position)
        if (range.collapsed) {
            // Insert the span at the cursor position
            range.insertNode(span);
            range.setStartAfter(span);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            // Surround the selected text with the span element
            range.surroundContents(span);

            // Clear the selection to avoid unexpected behavior
            selection.removeAllRanges();
        }
    } else {
        // If there is no selection, apply styles at the cursor position
        const span = document.createElement('span');
        span.style.fontSize = `${fontSize}px`;
        span.style.fontFamily = fontFamily;
        span.style.color = fontColor;

        const selectionNode = document.getSelection().anchorNode;
        const selectionOffset = document.getSelection().anchorOffset;

        const range = document.createRange();
        range.setStart(selectionNode, selectionOffset);
        range.setEnd(selectionNode, selectionOffset);

        range.insertNode(span);
        range.setStartAfter(span);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    // Update the options to reflect the current selection or cursor position
    document.getElementById('fontSize').value = fontSize;
    document.getElementById('fontFamily').value = fontFamily;
    document.getElementById('fontColor').value = fontColor;
}

// Updated event listeners to apply font customization immediately
document.getElementById('fontSize').addEventListener('input', updateFont);
document.getElementById('fontFamily').addEventListener('input', updateFont);
document.getElementById('fontColor').addEventListener('input', updateFont);








// Updated main.js
// Updated main.js
function saveAsPDF() {
    // Call updateFont before getting the editor content
    updateFont();

    const editorContent = document.getElementById('editor').innerHTML;
    const pdfName = document.getElementById('pdfName').value || 'document';

    // Create a new div to hold the content with applied styles
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = editorContent;
    contentDiv.style.fontSize = `${document.getElementById('editor').style.fontSize}`;
    contentDiv.style.fontFamily = `${document.getElementById('editor').style.fontFamily}`;
    contentDiv.style.color = `${document.getElementById('editor').style.color}`;

    // Use html2pdf to generate the PDF with improved image quality
    html2pdf(contentDiv, {
        margin: 10,
        filename: pdfName + '.pdf',
        image: { type: 'jpeg', quality: 1.0 },  // Set quality to 1.0 for maximum quality
        html2canvas: { scale: 10 },  // Adjust scale for improved resolution
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).then(() => {
        // Close the modal after saving PDF
        closeModal();
    });
}




