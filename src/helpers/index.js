export const generarId = () => {
    // Generar un ID único - en base hexadecimal (número random y timestamp)
    const random = Math.random().toString(16).substring(2);
    const timestamp = Date.now().toString(16);
    return random + timestamp;
}; 