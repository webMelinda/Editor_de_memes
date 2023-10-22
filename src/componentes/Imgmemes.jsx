import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";

function Imgmemes() {

    const [imgmeme, setImgmeme] = useState('https://i.imgflip.com/1otk96.jpg');
    const [textmeme, setTextmeme] = useState();
    const [img, setImg] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const imagesPerPage = 20;
    const startIndex = currentPage * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const visibleImg = img.slice(startIndex, endIndex);


    const [color, setColor] = useState('#FFFFFF');
    const [size, setSize] = useState(20);
    // const [size, setSize] = useState('');
    const [positionY, setPositionY] = useState(0);
    const [positionX, setPositionX] = useState('');

    const textomeme = (e) => {
        setTextmeme(e.target.value);
    }

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

    const myStyle = {
        color: color,
        fontSize: size + 'px',
        paddingTop: positionY + 'px',
        paddingLeft: parseInt(positionX),
    };



    const descargar = (e) => {
        html2canvas(document.querySelector("#exportar"), { useCORS: true }).then(function (canvas) {
            // document.body.appendChild(canvas);
            let img = canvas.toDataURL("memes/jpg");
            let link = document.createElement("a");
            link.download = "memepropio.jpg";
            link.href = img;
            link.click();
        });
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };





    return (
        
        <div className="text-center">
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={process.env.PUBLIC_URL + "/logo1.png"} alt="Logo"  width="30" height="24" className="d-inline-block align-text-top"/>
                            MemeEditor
                    </a>
                </div>
            </nav>
            <h1 className="mt-3 mb-3 text.center">Editor de memes</h1>

            <h3>Ingresa el texto del meme</h3>

            <input onChange={textomeme} className="form-control w-50 m-50 m-auto d-block" type="text" placeholder="Escribe tu frase" name="meme" aria-label="default input example"></input>

            <div className="row">
                <div className="col-md-8 col-sm-12" style={{ position: "relative" }}>
                    <div  style={{ display: 'inline-block' }}>
                    <h3>Vista Previa</h3>

                        {imgmeme && (
                            <figure className="contenedor-meme" id="exportar">
                                
                                <p className="position-absolute" id="textmeme" style={myStyle}>{textmeme}</p>

                                <img src={imgmeme} className="img-responsive d-block m-auto" alt="meme" />

                            </figure>
                        )}
                        <button onClick={descargar} type="button" className="btn btn-secondary mt-4 mb-4">Descargar meme</button>
                    </div>


                </div>
                <div className="col-md-4 col-sm-12">
                <h3>Opciones</h3>
                    <div className="row">
                    <div className="col-6">
                    
                    
                    <h4 className="p-3">Color de texto</h4>
                    <p className="p-3">Selecciona el color de tu frase</p>
                    <input
                        type="color"
                        value={setColor}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <h4 className="p-3">Tamaño de texto</h4>
                    <p className="p-3">Selecciona el tamaño de letra: {size}px</p>
                    <input
                        type="range"
                        min={10}
                        max={120}
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))} // Convert the value to a number
                        step={1}
                    />

                </div>

                <div className="col-6">
                <h4 className="p-3">Posición de texto</h4>
                    <p className="p-3">Selecciona la posición horizontal del texto:</p>
                    <input
                        type="range"
                        min={-400}
                        max={400}
                        value={positionX}
                        onChange={(e) => setPositionX(Number(e.target.value))}
                       
                    />
                    <p>Posición horizontal: {positionX}px</p>

                    <p className="p-3">Selecciona la posición vertical del texto:</p>
                    <input
                        type="range"
                        min={-500}
                        max={500} // Adjust the max value as needed
                        value={positionY}
                        onChange={(e) => setPositionY(Number(e.target.value))}
                    />
                    <p>Posición vertical: {positionY}px</p>
                </div>

                    </div>
                </div>
                

            </div>




            <h3 className="mt-3 mb-3 text-center">Elige la imagen que te gusta</h3>

            <section className="grid-container">

                {
                    visibleImg.map((meme) => (
                        <div >
                            <div key={meme.id} onClick={() => selecImg(meme.id)}>
                                <img src={meme.url} className="card-img-top" alt={meme.name} />
                            </div>
                        </div>
                    ))}
            </section>
            <div>
                <button className="btn btn-secondary mt-4 mb-4" onClick={prevPage} disabled={currentPage === 0}>
                    Anterior
                </button>
                <button className="btn btn-secondary mt-4 mb-4" onClick={nextPage} disabled={endIndex >= img.length}>
                    Siguiente
                </button>
            </div>
            <footer>
               <p>Melinda Pinto - Curso React CAC</p> 
            </footer>

        </div>
        
    
    );
}

export default Imgmemes;
