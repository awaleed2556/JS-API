import express from "express";
const router = express.Router();
import { sql } from "../db.js";

router.get('/years',async (req,res) => {
    const years = await sql`SELECT DISTINCT year FROM recap ORDER BY year;`;
    res.status(200).json(years);
});

router.get('/semesters/:year', async (req,res) => {
    const semesters = await sql`SELECT DISTINCT semester FROM recap WHERE year = ${req.params.year} ORDER BY semester;`;
    res.status(200).json(semesters);
    
});

router.get('/faculty/:year/:semester', async (req,res) => {
    const faculty = await sql`
    SELECT DISTINCT f.name, f.fid
    FROM faculty f 
    JOIN recap r ON f.fid=r.fid 
    WHERE semester = ${req.params.semester} AND year = ${req.params.year}  
    ORDER BY name;`;

    res.status(200).json(faculty);
});

router.get(`/criteria/:year/:semster/:fid`, async(req,res) => {
    const crit = await sql`
    SELECT g.gradeid,g.grade, COUNT(g.grade) total 
    FROM cmarks m, grade g
    WHERE m.rid in
    (SELECT rid 
    FROM faculty f 
    JOIN recap r 
    ON f.fid = r.fid 
    WHERE f.fid = ${req.params.fid} 
    AND semester = ${req.params.semster} 
    AND year = ${req.params.year}
    AND hid = 246
    AND ROUND(marks) BETWEEN g.start AND g.end )
    GROUP BY g.grade,g.gradeid;`
    res.status(200).json(crit);
});


export default router;
