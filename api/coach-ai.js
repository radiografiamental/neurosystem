export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await new Promise(resolve => setTimeout(resolve, 2000));
  return res.status(200).json({ 
    text: "PRUEBA: Tu consistencia esta semana es óptima. El córtex prefrontal está respondiendo bien al cronotipo seleccionado. Sigue aplicando los valles reales para mantener estables los niveles de acetilcolina." 
  });
}
