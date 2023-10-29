import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";

function Imgmemes() {

    const [imgmeme, setImgmeme] = useState('https://i.imgflip.com/1otk96.jpg');
    const [textmeme, setTextmeme] = useState();
    const [textmeme2, setTextmeme2] = useState();
    const [img, setImg] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const imagesPerPage = 20;
    const startIndex = currentPage * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const visibleImg = img.slice(startIndex, endIndex);


    const [color, setColor] = useState('#FFFFFF');
    const [size, setSize] = useState(20);
    const [positionY, setPositionY] = useState(0);
    const [positionX, setPositionX] = useState('');

    const [color2, setColor2] = useState('#FFFFFF');
    const [size2, setSize2] = useState(10);
    const [positionY2, setPositionY2] = useState(0);
    const [positionX2, setPositionX2] = useState('');

    const textomeme = (e) => {
        setTextmeme(e.target.value);
    }

    const textomeme2 = (e) => {
        setTextmeme2(e.target.value);
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

    const myStyle2 = {
        color: color2,
        fontSize: size2 + 'px',
        paddingTop: positionY2 + 'px',
        paddingLeft: parseInt(positionX2),
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
                        <img src={process.env.PUBLIC_URL + "/logo1.png"} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                        MemeEditor
                    </a>
                </div>
            </nav>
            <h1 className="mt-3 mb-3 text.center">Editor de memes</h1>

            <div className="row">
                <div className="col-md-7 col-sm-12" style={{ position: "relative" }}>
                    <div style={{ display: 'inline-block' }}>
                        <h3>Vista Previa</h3>

                        {imgmeme && (
                            <figure className="contenedor-meme" id="exportar">

                                <p className="position-absolute" id="textmeme" style={myStyle}>{textmeme}</p>
                                <p className="position-absolute" id="textmeme" style={myStyle2}>{textmeme2}</p>

                                <img src={imgmeme} className="img-responsive d-block m-auto" alt="meme" />

                            </figure>
                        )}
                        <button onClick={descargar} type="button" className="btn btn-custom btn-secondary mt-4 mb-4">Descargar meme</button>
                    </div>


                </div>


                <div className="col-md-5 col-sm-12">
                    <div className="row">
                        <div className="col-12">
                            <h4>Ingresa el texto del meme:</h4>


                            <input onChange={textomeme} className="form-control w-50 m-50 m-auto d-block" type="text" placeholder="Escribe tu frase" name="meme" aria-label="default input example"></input>

                            <p className="d-inline-flex gap-1">

                                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                <i class="fa-solid fa-palette"></i>
                                </button>
                                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">
                                <i class="fa-solid fa-text-height"></i>
                                </button>
                                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample">
                                <i class="fa-solid fa-arrows-up-down-left-right"></i>
                                </button>
                            </p>
                            <div className="collapse dark col-md-4 col-sm-12" id="collapseExample">
                                <div className="card card-body text-bg-secondary" style={{ width: "15rem" }}>


                                    <div>


                                        <h5 className="p-3">Color de texto</h5>
                                        <input
                                            type="color"
                                            value={setColor}
                                            onChange={(e) => setColor(e.target.value)}
                                        />


                                    </div>

                                </div>
                            </div>
                            <div className="collapse dark col-md-4 col-sm-12" id="collapseExample2">
                                <div className="card card-body text-bg-secondary" style={{ width: "15rem" }}>


                                    <div>

                                        <h5 className="p-3">Tamaño de texto</h5>
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

                                </div>
                            </div>

                            <div className="collapse dark col-md-4 col-sm-12" id="collapseExample3">
                                <div className="card card-body text-bg-secondary" style={{ width: "15rem" }}>


                                    <div>

                                        <h5 className="p-3">Posición de texto</h5>
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
                        {/* Texto2 */}
                        <div className="col-12">
                            <h4>Ingresa texto opcional: </h4>

                            <input onChange={textomeme2} className="form-control w-50 m-50 m-auto d-block" type="text" placeholder="Escribe tu frase" name="meme" aria-label="default input example"></input>

                            <p className="d-inline-flex gap-1">

                                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapsecolor" aria-expanded="false" aria-controls="collapseExample">
                                <i class="fa-solid fa-palette"></i>
                                </button>
                                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseletra" aria-expanded="false" aria-controls="collapseExample">
                                <i class="fa-solid fa-text-height"></i>
                                </button>
                                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseposition" aria-expanded="false" aria-controls="collapseExample">
                                <i class="fa-solid fa-arrows-up-down-left-right"></i>
                                </button>
                            </p>
                            <div className="row">
                                <div className="collapse dark col-md-4 col-sm-12" id="collapsecolor">
                                    <div className="card card-body text-bg-secondary" style={{ width: "15rem" }}>


                                        <div>


                                            <h5 className="p-3">Color de texto</h5>
                                            {/* <p className="p-3">Selecciona el color de tu frase</p> */}
                                            <input
                                                type="color"
                                                value={setColor2}
                                                onChange={(e) => setColor2(e.target.value)}
                                            />


                                        </div>

                                    </div>
                                </div>
                                <div className="collapse dark col-md-4 col-sm-12" id="collapseletra">
                                    <div className="card card-body text-bg-secondary" style={{ width: "15rem" }}>


                                        <div>

                                            <h5 className="p-3">Tamaño de texto</h5>
                                            {/* <p className="p-3">Selecciona el tamaño de letra: {size2}px</p> */}
                                            <input
                                                type="range"
                                                min={10}
                                                max={120}
                                                value={size2}
                                                onChange={(e) => setSize2(Number(e.target.value))} // Convert the value to a number
                                                step={1}
                                            />


                                        </div>

                                    </div>
                                </div>

                                <div className="collapse dark col-md-3 col-sm-12" id="collapseposition">


                                    <div className="card card-body text-bg-secondary " style={{ width: "14rem" }}>


                                        <div>

                                            <h5 className="p-3">Posición de texto</h5>
                                            {/* <p className="p-3">Selecciona la posición horizontal del texto:</p> */}
                                            <input
                                                type="range"
                                                min={-400}
                                                max={400}
                                                value={positionX2}
                                                onChange={(e) => setPositionX2(Number(e.target.value))}

                                            />
                                            <p>Posición horizontal: {positionX2}px</p>

                                            {/* <p className="p-3">Selecciona la posición vertical del texto:</p> */}
                                            <input
                                                type="range"
                                                min={-500}
                                                max={500} // Adjust the max value as needed
                                                value={positionY2}
                                                onChange={(e) => setPositionY2(Number(e.target.value))}
                                            />
                                            <p>Posición vertical: {positionY2}px</p>


                                        </div>

                                    </div>
                                </div>
                            </div>

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
                <button className="btn btn-custom btn-secondary mt-4 mb-4" onClick={prevPage} disabled={currentPage === 0}>
                    Anterior
                </button>
                <button className="btn btn-custom btn-secondary mt-4 mb-4" onClick={nextPage} disabled={endIndex >= img.length}>
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
