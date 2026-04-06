let laporan = [];
let pilihan = "Infrastruktur";
let edit = false;

let sedangEdit = null;

// tampilan statistik di home
function statistik() {
  const jumlahI = laporan.filter(
    (stat) => stat.kategori === "Infrastruktur",
  ).length;
  const jumlahL = laporan.filter(
    (stat) => stat.kategori === "Lingkungan",
  ).length;

  document.getElementById("statusI").innerText = jumlahI;
  document.getElementById("statusL").innerText = jumlahL;
}

function read() {
  const listLaporan = document.getElementById("dataLaporan");
  listLaporan.innerHTML = "";
  const listData = document.getElementById("tabelAdmin");
  listData.innerHTML = "";

  laporan
    .filter((i) => i.kategori === pilihan)
    .forEach((tbl) => {
      listLaporan.innerHTML += `
        <div>
            <strong>${tbl.judul}</strong><br>
            <small>Pelapor: ${tbl.nama}</small><br>
            <span>${tbl.status}</span>
        </div>
        <hr>    
        `;
    });

  laporan.forEach((tbl) => {
    listData.innerHTML += `
        <tr>
            <td>${tbl.id}</td>
            <td>${tbl.nama}</td>
            <td>${tbl.judul}</td>
            <td>${tbl.status}</td>
            <td>${tbl.waktu}</td>
            <td>
                <button class="btn" type="button" onclick="update('${tbl.id}')">Edit</button>
                <button class="btn" type="button" onclick="hapusLaporan('${tbl.id}')">Hapus</button>
            </td>
        </tr>
        `;
  });

  statistik();
}

// create
let form = document.getElementById("pengisian");
form.addEventListener("submit", function kirim(a) {
  a.preventDefault();
  const namaFix = document.getElementById("nama").value.toUpperCase();
  const judul = document.getElementById("judul-lap").value;
  const kategori = document.getElementById("kategori").value;
  const status = document.getElementById("statusInput").value;

  if (edit && sedangEdit !== null) {
    sedangEdit.nama = namaFix;
    sedangEdit.judul = judul;
    sedangEdit.kategori = kategori;
    sedangEdit.status = status;

    alert("Perubahan di simpan");
  } else {
    const tgl = new Date();
    const waktuString =
      tgl.getDate() + "-" + (tgl.getMonth() + 1) + "-" + tgl.getFullYear();
    const idBaru = "ID- " + Math.floor(Math.random() * 100);

    laporan.push({
      id: idBaru,
      nama: namaFix,
      judul: document.getElementById("judul-lap").value,
      kategori: document.getElementById("kategori").value,
      status: document.getElementById("statusInput").value,
      waktu: waktuString,
    });
  }
  resetForm();
  read();
});

// update data
function update(id) {
  for (let i = 0; i < laporan.length; i++) {
    if (laporan[i].id === id) {
      sedangEdit = laporan[i];
      edit = true;
      break;
    }
  }

  document.getElementById("nama").value = sedangEdit.nama;
  document.getElementById("judul-lap").value = sedangEdit.judul;
  document.getElementById("kategori").value = sedangEdit.kategori;
  document.getElementById("statusInput").value = sedangEdit.status;
  document.getElementById("btn-submit").innerText = "Simpan Perubahan";
  document.getElementById("btn-batal").style.display = "inline-block";

  document.getElementById("pengisian").scrollIntoView();
}

// hapusdata
function hapusLaporan(id) {
  if (confirm("Hapus laporan ini?")) {
    laporan = laporan.filter((i) => i.id !== id);
    read();
  }
}

function resetForm() {
  edit = false;
  sedangEdit = null;

  document.getElementById("pengisian").reset();
  document.getElementById("btn-submit").innerText = "Kirim Laporan";
  document.getElementById("btn-batal").style.display = "none";
}

function filter(opsi, el) {
  pilihan = opsi;
  document
    .querySelectorAll(".btn-filter")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  read();
}

document.getElementById("btn-batal").onclick = resetForm;
read();
