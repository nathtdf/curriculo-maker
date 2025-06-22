function gerarCurriculo() {
  const nome = document.getElementById("nome").value;
  const cargo = document.getElementById("cargo").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const resumo = document.getElementById("resumo").value;
  const experiencia = document.getElementById("experiencia").value;
  const formacao = document.getElementById("formacao").value;
  const habilidades = document.getElementById("habilidades").value;
  const modelo = document.getElementById("modelo").value;
  const fotoInput = document.getElementById("foto");
  const fotoFile = fotoInput.files[0];

  
  const experienciaFormatada = experiencia.replace(/\n/g, "<br>");
  const habilidadesFormatada = habilidades.replace(/\n/g, "<br>");

  const reader = new FileReader();
  reader.onload = function(e) {
    const fotoBase64 = e.target.result;

    let curriculoHTML = '';
    
    if (modelo === "modelo1") {
      curriculoHTML = `
        <div style="padding: 20px; font-family: Arial;">
          <div style="display: flex; align-items: center; gap: 20px;">
            ${fotoFile ? `<img src="${fotoBase64}" style="width:100px; border-radius:50%;">` : ''}
            <div>
              <h1>${nome}</h1>
              <h2>${cargo}</h2>
              <p><strong>Email:</strong> ${email} | <strong>Telefone:</strong> ${telefone}</p>
            </div>
          </div>
          <h3>Resumo Profissional</h3>
          <p>${resumo}</p>
          <h3>Experiência</h3>
          <p>${experienciaFormatada}</p>
          <h3>Formação</h3>
          <p>${formacao}</p>
          <h3>Habilidades</h3>
          <p>${habilidadesFormatada}</p>
        </div>
      `;
    } else if (modelo === "modelo2") {
      curriculoHTML = `
        <div style="font-family: 'Segoe UI'; padding: 30px; color: #333;">
          <div style="text-align:center;">
            ${fotoFile ? `<img src="${fotoBase64}" style="width:120px; border-radius:10px; margin-bottom: 10px;">` : ''}
            <h1>${nome}</h1>
            <h2 style="color:#007bff;">${cargo}</h2>
            <p>${email} | ${telefone}</p>
          </div>
          <hr>
          <h3>Resumo</h3>
          <p>${resumo}</p>
          <h3>Experiência</h3>
          <p>${experienciaFormatada}</p>
          <h3>Formação</h3>
          <p>${formacao}</p>
          <h3>Habilidades</h3>
          <p>${habilidadesFormatada}</p>
        </div>
      `;
    }

    const container = document.getElementById("curriculo");
    container.innerHTML = curriculoHTML;
    container.style.display = "block";

  setTimeout(() => {
  const opt = {
    margin:       10,
    filename:     `${nome}-curriculo.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

    html2pdf().set(opt).from(container).save();
  }, 300);

  
  };

  if (fotoFile) {
    reader.readAsDataURL(fotoFile);
  } else {
    reader.onload({ target: { result: '' } });
  }
}
