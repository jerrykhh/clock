import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if (req.method === 'GET'){
        res.status(200).json(
            {
                image: "https://images.chinahighlights.com/allpicture/2019/11/135e01ded864418d8f699bec_cut_800x500_117.jpg"
            }
        )
    }
    
}
