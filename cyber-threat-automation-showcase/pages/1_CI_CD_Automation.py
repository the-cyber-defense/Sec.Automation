import streamlit as st
from scripts.CI_and_CD.utils.secrets_scanner import scan_codebase
import tempfile
import os

st.title("🔧 CI/CD Automation")

uploaded_file = st.file_uploader("Upload CI/CD artifacts or codebase for scanning:", type=["zip"])

if uploaded_file:
    with tempfile.TemporaryDirectory() as tmpdirname:
        zip_path = os.path.join(tmpdirname, uploaded_file.name)
        with open(zip_path, "wb") as f:
            f.write(uploaded_file.getbuffer())
        
        results = scan_codebase(zip_path)
        st.json(results)