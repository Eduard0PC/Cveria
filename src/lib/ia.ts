export async function analizarConOpenRouter(
    prompt: string, 
    model: string = 'anthropic/claude-3-haiku') {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.IA_API_KEY}`,
      'X-Title': 'AnalizadorCV',
    },
    body: JSON.stringify({
      model,
      stream: false, 
      messages: [{ 
        role: 'user', 
        content: prompt 
    }],
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error?.error?.message || 'Error al contactar a OpenRouter')
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content
  return content
}
