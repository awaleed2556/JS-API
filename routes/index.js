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
    SELECT grade, avg_all AS average,
    CASE 
    WHEN avg_all > 86 THEN 'Lenient'
    WHEN avg_all > 70 THEN 'Moderate'
    WHEN avg_all > 59 THEN 'Strict'
    ELSE 'Very Strict'
    END AS marking_criteria
    FROM grade g,
    (
        SELECT AVG(a) AS avg_all
        FROM (
            SELECT AVG(marks) AS a
            FROM cmarks m 
            JOIN recap r ON r.rid = m.rid 
            WHERE m.hid = 246 
                AND r.year = ${req.params.year} 
                AND r.semester = ${req.params.semster}
                AND fid = ${req.params.fid}
            GROUP BY class
        ) AS per_class_avg
    ) AS overall_avg
    WHERE ROUND(avg_all) BETWEEN g.start AND g.end;`
    res.status(200).json(crit);
});


export default router;
