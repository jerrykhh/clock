import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if (req.method === 'GET'){
        const ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        res.status(200).json({
            ip_address
        })
    }
    
}
