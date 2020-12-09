import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import '../styles/pages/orphanages-map.css';
import api from '../services/api';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function OrphanagesMap() {
    const [logged, setLogged] = useState(false);

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
        const name = localStorage.getItem('name');
        if (name){
            setLogged(true);
        }
    }, []);    

    function Logout(){
        localStorage.setItem('name', '');
        localStorage.setItem('email', '');
        window.location.href = "/";
        //window.location.reload();
    }
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>
                </header>

                <footer>
                    {
                        logged ? (<button type="button" className="logout" onClick={Logout}> Sair</button>) : (<strong>Jequié - Bahia</strong>)
                    }
                </footer>
            </aside>
            
            <MapContainer 
                center={[-13.8734537, -40.068331]} 
                zoom={15} 
                style={{ width:'100%', height: '100%' }}>
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

               {orphanages.map(orphanage =>{
                   return (
                        <Marker
                        position={[orphanage.latitude, orphanage.longitude]}
                        icon= {mapIcon}
                        key={orphanage.id}
                        >

                        <Popup closeButton = {false} minWidth={240} maxWidth={240} className="map-popup"> 
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                            <FiArrowRight size={20} color="#FFF"/>
                            </Link>
                        </Popup>
                        </Marker>
                   )
               })}

            </MapContainer>
            
            {
                logged ? (<Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/></Link>) : (<Link to="/login" className="create-orphanage">Entrar</Link> )
            }
        </div>
    )
}

export default OrphanagesMap;