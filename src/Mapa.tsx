import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { useEffect, useState } from 'react'
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

type Ponto = [number, number] // [latitude, longitude]

const CAMPUS: Ponto = [-5.0577, -42.7955] // valor aproximado

// No Vite os ícones padrão do Leaflet quebram; apontamos para as imagens importadas.
const icone = L.icon({ iconUrl, iconRetinaUrl, shadowUrl, iconSize: [25, 41], iconAnchor: [12, 41] })

// O "center" do MapContainer só vale na criação; para mover depois, usamos o objeto do mapa.
function Recentralizar({ ponto }: { ponto: Ponto | null }) {
  const mapa = useMap()
  useEffect(() => {
    if (ponto) mapa.setView(ponto, 18)
  }, [ponto, mapa])
  return null
}

export default function Mapa() {
  const [minhaPosicao, setMinhaPosicao] = useState<Ponto | null>(null)

  function localizar() {
    // Exige HTTPS (ou localhost) e a permissão do usuário.
    navigator.geolocation.getCurrentPosition(
      (p) => setMinhaPosicao([p.coords.latitude, p.coords.longitude]),
      () => alert('Não foi possível obter a localização (permissão negada?)'),
    )
  }

  return (
    <section>
      <h1>Mapa</h1>
      <button onClick={localizar}>Minha localização</button>

      {/* O contêiner PRECISA ter altura, senão o mapa fica invisível. */}
      <MapContainer center={CAMPUS} zoom={17} style={{ height: '70vh', width: '100%' }}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={CAMPUS} icon={icone}>
          <Popup>Marcador fixo (ex.: um quiosque)</Popup>
        </Marker>
        {minhaPosicao && <CircleMarker center={minhaPosicao} radius={10} />}
        <Recentralizar ponto={minhaPosicao} />
      </MapContainer>
    </section>
  )
}