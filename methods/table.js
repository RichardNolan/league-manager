const methods = {

    // accepts an array of fixtures each containing a score
    createTable : (fixtures)=>{
        
        let teamObj = {}
        fixtures.forEach(fixture => {
            let { home_team, away_team, score_home, score_away } = fixture
            home_team = home_team._id
            away_team = away_team._id
            
            // SKIP IF THE SCORE IS INVALID
            if( typeof score_home !== 'number' 
            || typeof score_away !== 'number'
            ) return ;

            let blank = {team:"", p:0, w:0, d:0, l:0, f:0, a:0, gd:0, pts:0, hp:0, ap:0, hw:0, aw:0, hd:0, ad:0, hl:0, al:0, hf:0, af:0, ha:0, aa:0, hgd:0, agd:0, hpts:0, apts:0, form:"", hform:"", aform:""};

            // STANDARD UPDATES TO THE TABLE, REGARDLESS OF THE RESULT
                !teamObj[home_team] && (teamObj[home_team] = Object.assign({}, blank))
                !teamObj[away_team] && (teamObj[away_team] = Object.assign({}, blank))

                //TEAM NAME
                !teamObj[home_team].team && (teamObj[home_team].team = home_team)
                !teamObj[away_team].team && (teamObj[away_team].team = away_team)

                // PLAYED
                teamObj[home_team].p = teamObj[home_team].p+1
                teamObj[home_team].hp = teamObj[home_team].hp+1
                teamObj[away_team].p = teamObj[away_team].p+1
                teamObj[away_team].ap = teamObj[away_team].ap+1

                // SCORES FOR/AGAINST/DIFFERENCE - HOME TEAM
                teamObj[home_team].f = teamObj[home_team].f+score_home
                teamObj[home_team].hf = teamObj[home_team].hf+score_home
                teamObj[home_team].a = teamObj[home_team].a+score_away
                teamObj[home_team].ha = teamObj[home_team].ha+score_away
                teamObj[home_team].gd = teamObj[home_team].f-teamObj[home_team].a
                teamObj[home_team].hgd = teamObj[home_team].hf-teamObj[home_team].ha

                // SCORES FOR/AGAINST/DIFFERENCE - AWAY TEAM
                teamObj[away_team].f = teamObj[away_team].f+score_away
                teamObj[away_team].af = teamObj[away_team].af+score_away
                teamObj[away_team].a = teamObj[away_team].a+score_home
                teamObj[away_team].aa = teamObj[away_team].aa+score_home
                teamObj[away_team].gd = teamObj[away_team].f-teamObj[away_team].a
                teamObj[away_team].agd = teamObj[away_team].af-teamObj[away_team].aa

            // IF THE HOME TEAM WON (AWAY TEAM LOST) - SOME SPECIFIC UPDATES
                if(score_home>score_away){
                    teamObj[home_team].w = teamObj[home_team].w+1
                    teamObj[home_team].hw = teamObj[home_team].hw+1
                    teamObj[home_team].pts = teamObj[home_team].pts+3
                    teamObj[home_team].hpts = teamObj[home_team].hpts+3
                    teamObj[away_team].l = teamObj[away_team].l+1
                    teamObj[away_team].al = teamObj[away_team].al+1
                    teamObj[home_team].form+="3"
                    teamObj[home_team].hform+="3"
                    teamObj[away_team].form+="0"
                    teamObj[away_team].aform+="0"
            // IF THE HOME TEAM LOST (AWAY TEAM WON) - MORE SPECIFIC UPDATES
                }else if(score_home<score_away){
                    teamObj[away_team].w = teamObj[away_team].w+1
                    teamObj[away_team].aw = teamObj[away_team].aw+1
                    teamObj[away_team].pts = teamObj[away_team].pts+3
                    teamObj[away_team].apts = teamObj[away_team].apts+3
                    teamObj[home_team].l = teamObj[home_team].l+1
                    teamObj[home_team].hl = teamObj[home_team].hl+1
                    teamObj[home_team].form+="0"
                    teamObj[home_team].hform+="0"
                    teamObj[away_team].form+="3"
                    teamObj[away_team].aform+="3"
            // OR IT WAS A DRAW - MORE SPECIFIC UPDATES
                }else if(score_home===score_away){
                    teamObj[home_team].d = teamObj[home_team].d+1
                    teamObj[home_team].hd = teamObj[home_team].hd+1
                    teamObj[home_team].pts = teamObj[home_team].pts+1
                    teamObj[home_team].hpts = teamObj[home_team].hpts+1
                    teamObj[away_team].d = teamObj[away_team].d+1
                    teamObj[away_team].ad = teamObj[away_team].ad+1
                    teamObj[away_team].pts = teamObj[away_team].pts+1
                    teamObj[away_team].apts = teamObj[away_team].apts+1
                    teamObj[home_team].form+="1"
                    teamObj[home_team].hform+="1"
                    teamObj[away_team].form+="1"
                    teamObj[away_team].aform+="1"
                }
        
        });

        // CYCLE THROUGH KEYS PUSHING EACH OBJECT TO AN ARRAY
        const table = []
        Object.keys(teamObj).forEach(key=>{
            table.push(teamObj[key])
        })

        return methods.sortTable(table)
    },

    sortTable: table =>{
        return table.sort((a,b)=>{
            if(a.pts>b.pts) return -1
            if(a.pts<b.pts) return 1
            if(a.pts===b.pts) {
                if(a.gd>b.gd) return -1
                if(a.gd<b.gd) return 1
                if(a.gd===b.gd) {
                    if(a.f>b.f) return -1
                    if(a.f<b.f) return 1
                }
            }
            return 0
        })
    }

}

module.exports = methods