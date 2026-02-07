from PyPDF2 import PdfReader

def extract_pdf_text(file):
    reader = PdfReader(file)
    feedbacks = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            lines = text.split("\n")
            feedbacks.extend([l.strip() for l in lines if l.strip()])
    return feedbacks
