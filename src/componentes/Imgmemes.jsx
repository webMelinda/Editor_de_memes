import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";

function Imgmemes() {

    const [imgmeme, setImgmeme] = useState();
    const [textmeme, setTextmeme] = useState();
    const [img, setImg] = useState([]);

    const textomeme = (e) => {
        setTextmeme(e.target.value);
    }

    // const seleccionarImg = (e) => {
    //     setImgmeme(e.target.value);
    // }

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(data => data.json())
            .then(json => setImg(json.data.memes));
    }, []);

    const selecImg = (id) => {
        const memeSeleccionado = img.find(meme => meme.id === id);
        if (memeSeleccionado) {
          setImgmeme(memeSeleccionado.url);
          window.scrollTo(0, 0);
        }
      }
    

    const descargar = (e) => {
        html2canvas(document.querySelector("#exportar"), {useCORS: true}).then(function (canvas) {
            // document.body.appendChild(canvas);
            let img = canvas.toDataURL("memes/jpg");
            let link = document.createElement("a");
            link.download = "memepropio.jpg";
            link.href = img;
            link.click();
        });
    }



    return (
        <div className="text-center">
            <h1 className="mt-3 mb-3 text.center">Editor de memes</h1>

            <h3>Ingresa el texto del meme</h3>

            <input onChange={textomeme} className="form-control w-50 m-50 m-auto d-block" type="text" placeholder="Escribe tu frase" name="meme" aria-label="default input example"></input>
            
            {/* <figure className="text-center" id="exportar">
                <p className="w-100 px-30 position-absolute top-50 start-30 h1 text-center">{textmeme}</p>
                <img src={`./memes/${imgmeme}.jpg`} className="figure-img mt-3 d-block m-auto" alt="meme" />

            </figure> */}

            <div className="contenedor">
                <div id="exportar" style={{ display: 'inline-block' }}>
                    {imgmeme && (
                        <figure className="contenedor-meme">
                            <p className="w-100 px-30 position-absolute top-50 start-30 h1 text-center">{textmeme}</p>
                            <br></br>
                            <img src={imgmeme} className="figure-img d-block m-auto" alt="meme" />
                            
                        </figure>
                    )}
                </div>
            </div>

            <button onClick={descargar} type="button" className="btn btn-primary mt-4 mb-4">Descargar meme</button>
            <h3 className="mt-3 mb-3 text-center">Elige la imagen que te gusta</h3>
           
             <section className="elegir-meme">
                {
                    img.map((meme) => (
                        <div className="card" style={{width: "18rem"}}>
                            <img src={meme.url} className="card-img-top" alt={meme.name}/>
                                <div className="card-body">
                                    <a class="btn btn-primary" key={meme.id} onClick={() => selecImg(meme.id)}>Seleccionar</a>
                                </div>
                        </div>
                    ))}
            </section>  

{/* 
            <section className="elegir-meme">
                {imgmeme.map(meme => (
                    <div >
                        <img src={meme.url} alt={meme.name} />
                    </div>
                ))}
            </section> */}
    



            

            {/* <select onChange={seleccionarImg} className="form-select form-select-lg mb-3 w-50 m-auto" aria-label=".form-select-lg example">
            <option value={1}>Futurama</option>
            <option value={2}>Bob esponja</option>
            <option value={3}>Señora</option>
            <option value={4}>Calamardo</option>
        </select>  */}



            

     </div>  
    );
}

export default Imgmemes;
