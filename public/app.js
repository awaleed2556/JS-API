function App() {
    return {                                                                           
        years: [],                                                                              // return this object
        semesters: [],
        faculty: [],
        criteria: [],
        click: { clicked_year:'', clicked_semester:'', clicked_faculty:''},                                            // to show a div when it is clicked and to filter down queries
        async getYears() {    
            const years = await fetch(`/api/years`).then(res => res.json());                    // fetch the json from the api
            this.years = years;                                                                 // use this array to display on the front end            
        },
        async getSemesters(year) {
            this.click.clicked_course = '';
            this.click.clicked_semester = '';
            this.click.clicked_faculty = '';
            this.courses = [];
            this.semesters = [];
            this.faculty = [];
            
            this.click['clicked_year'] = year;                                                                       // update the empty variable
            const semesters = await fetch(`/api/semesters/${this.click.clicked_year}`).then(res => res.json());
            this.semesters = semesters;
            
        },
        async getFaculty(semester) {
            this.click['clicked_semester'] = semester;
            const faculty = await fetch(`/api/faculty/${this.click.clicked_year}/${this.click.clicked_semester}`).then(res => res.json());
            this.faculty = faculty;
        },
        async getCriteria(fid) {
            this.click['clicked_faculty'] = fid;
            const crit = await fetch(`/api/criteria/${this.click.clicked_year}/${this.click.clicked_semester}/${this.click.clicked_faculty}`).then(res => res.json());
            this.criteria = crit;
        }
    }
}