// Be able to put in some variables (t, a, v0, vf, x0, x, etc.) Can solve equations.
// Graphs for pos, vel, accel, time, etc.
// FUNCTIONS {
//    EQUATION 1: v = at + v0 (Given 3 of 4 [v, a, t, v0], can find last one)
//    EQUATION 2: vf = sqrt(2a * delta(x) + vi^2) (Given 3 of 4 [vf, a, delta(x), vi], can find last one)
//    EQUATION 3: delta(x) = 1/2 * a * t^2 + v0 * t (Given 3 of 4 [delta(x), a, t, v0] can find the last 1)
//}
// THINGS I LEARNED:
    // String formatting in JS -> Use backticks, ${} as formatting
    // Try/Catch blocks -> Do something. If there's an error, do something else. Finally, do something regardless
    // parseFloat(value) -> Takes a string, returns a float. If the string doesn't yield a number, returns NaN (which is a value)
function ready() {
    let eqforms = [document.forms.equation1, document.forms.equation2, document.forms.equation3]
    let selection = document.forms.eqSelect.elements.equation
    solve.onclick = function() {
        bringUpForm(selection.value)
        console.log(selection.value)
    }
    back.onclick = function() {
        tomainmenu()
    }
    function tomainmenu() {
        cleargraphs()
        for (let index = 0; index < eqforms.length; index++) {
            const element = eqforms[index];
            element.classList.add('hidden')
            
        }
        back.classList.add('hidden')
        document.forms.eqSelect.classList.remove('hidden')
    
    }
};

function bringUpForm(equation)  {
    // console.log(document.forms.eqSelect.classList)
    document.forms.eqSelect.classList.add('hidden')
    back.classList.remove('hidden')
    // console.log(document.forms.eqSelect.classList)
    if (equation == 'eq1') {
        document.forms.equation1.classList.remove('hidden')
        document.forms.equation1.onchange = function() {
            eq1answer.innerHTML = solveEquation1(this.elements.v.value, this.elements.a.value, this.elements.t.value, this.elements.v0.value)
        }

    }else if (equation == 'eq2') {
        document.forms.equation2.classList.remove('hidden')
        document.forms.equation2.onchange = function() {
            console.log(this.elements.vf.value)
            eq2answer.innerHTML = solveEquation2(this.elements.vf.value, this.elements.a.value, this.elements.delx.value, this.elements.vi.value)
        }

    }else if (equation == 'eq3') {
        document.forms.equation3.classList.remove('hidden')
        console.log(document.forms.equation3)
        document.forms.equation3.onchange = function() {
            eq3answer.innerHTML = solveEquation3(this.elements.delx.value, this.elements.a.value, this.elements.t.value, this.elements.v0.value)
        }

    };

};
function cleargraphs() {
    Plotly.purge(atgraph)
    Plotly.purge(vtgraph)
}
function createXTGraph(acceleration, time, initialvel) {
    let data = {};
    data['x'] = []
    data['t'] = []
    let oop = 0

    
    if (time < 0) {
        while (oop>(time)) {
            data['t'].push(oop)
            data['x'].push((0.5 * acceleration * oop * oop) + (initialvel * oop))
            oop -= Math.abs(time)/100
    
        };

    }else if (time > 0) {
        while (oop<(time)) {
            data['t'].push(oop)
            data['x'].push((0.5 * acceleration * oop * oop) + (initialvel * oop))
            oop += time/100
    
        };
    }else {

        while (oop<5) {
            data['t'].push(oop)
            data['x'].push((0.5 * acceleration * oop * oop) + (initialvel * oop))
            oop += 0.1
    
        };
    }


    let layout = {
        title: {
            text:'Position vs. Time',
            font: {
              family: 'Courier New, monospace',
              size: 24
            },
            xref: 'paper',
            x: 0.05,
          },
          xaxis: {
            title: {
              text: 'Time',
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
              }
            },
          },
          yaxis: {
            title: {
              text: 'Position',
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
              }
            }
          }
        
        
        
    }
    console.log(data)
    trace = { x:data['t'], y:data['x'] , type:'scatter'}
    fig = {
        data: [trace],
        layout:layout
    }
    Plotly.react(xtgraph, fig)
}
function createVTGraph(acceleration, time, initialvel) {
    let data = {};
    data['v'] = []
    data['t'] = []
    let oop = 0

    
    if (time < 0) {
        while (oop>(time)) {
            data['t'].push(oop)
            data['v'].push((acceleration * oop) + initialvel)
            oop -= Math.abs(time)/100
    
        };

    }else if (time > 0) {
        while (oop<(time)) {
            data['t'].push(oop)
            data['v'].push(acceleration * oop + initialvel)
            oop += time/100
    
        };
    }else {

        while (oop<5) {
            data['t'].push(oop)
            data['v'].push(acceleration * oop + initialvel)
            oop += 0.1
    
        };
    }


    let layout = {
        title: {
            text:'Velocity vs. Time',
            font: {
              family: 'Courier New, monospace',
              size: 24
            },
            xref: 'paper',
            x: 0.05,
          },
          xaxis: {
            title: {
              text: 'Time',
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
              }
            },
          },
          yaxis: {
            title: {
              text: 'Velocity',
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
              }
            }
          }
        
        
        
    }
    console.log(data)
    trace = { x:data['t'], y:data['v'] , type:'scatter'}
    fig = {
        data: [trace],
        layout:layout
    }
    Plotly.react(vtgraph, fig)
}
function createATGraph(acceleration, time) {
    let data = {};
    data['a'] = []
    data['t'] = []
    
    let oop= 0;
    // oop is 0, time is -5
    // oop is -something
    if (time < 0) {
        while (oop>(time)) {
            data['t'].push(oop)
            data['a'].push(acceleration)
            oop -= Math.abs(time)/100
    
        };

    }else if (time > 0) {
        while (oop<(time)) {
            data['t'].push(oop)
            data['a'].push(acceleration)
            oop += time/100
    
        };
    }else {

        while (oop<5) {
            data['t'].push(oop)
            data['a'].push(acceleration)
            oop += 0.1
    
        };
    }


    let layout = {
        title: {
            text:'Acceleration vs. Time',
            font: {
              family: 'Courier New, monospace',
              size: 24
            },
            xref: 'paper',
            x: 0.05,
          },
          xaxis: {
            title: {
              text: 'Time',
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
              }
            },
          },
          yaxis: {
            title: {
              text: 'Acceleration',
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
              }
            }
          }
        
        
        
    }
    console.log(data)
    trace = { x:data['t'], y:data['a'] , type:'scatter'}
    fig = {
        data: [trace],
        layout:layout
    }
    Plotly.react(atgraph, fig)
}
function solveEquation3(delx, a, t, v0) {
    let valarray = [delx, a, t, v0];
    let nulls = 0;
    for (let index = 0; index < valarray.length; index++) {
        const element = valarray[index];
        if (element == '') {
            valarray[index] = null;
            nulls++;
        }else {
            valarray[index] = parseFloat(element);
        };
    };
    delx = valarray[0]
    a = valarray[1]
    t = valarray[2]
    v0 = valarray[3]
    if (nulls == 1) {
        try {
            if (delx == null) {
                // delta(x) = 1/2 * a * t^2 + v0 * t
                delx = 0.5 * a * t * t + (v0 * t)
                createATGraph(a, t)
                createVTGraph(a, t, v0)
                return `Change in X: ${0.5 * a * t * t + (v0 * t)}`

            }else if (a == null) {
                //delta(x) = 1/2 * a * t^2 + v0 * t
                // delx - (v0 * t) = 1/2t^2 * a
                // 2(delx - (v0*t))/t^2 = a
                a = 2 * (delx - (v0 * t))/(t * t)
                createATGraph(a, t)
                createVTGraph(a, t, v0)
                return `Acceleration: ${2 * (delx - (v0 * t))/(t * t)}`
            }else if (t == null) {
                //delta(x) = 1/2 * a * t^2 + v0 * t
                //0 = 1/2a t^2 + v0 * t - delx
                //QUADRATIC FORMULA:
                // (-b +- sqrt(b^2 - 4ac))/2a
                // b = v0
                // c = -delx
                // a = 1/2a
                // (-v0 +- sqrt(v0^2 - (2*a*-delx)))/a
                t = ((-1 * v0) + Math.sqrt((v0 * v0) - (2 * a * (-1 * delx))))/a
                createATGraph(a, t)
                createVTGraph(a, t, v0)
                return `Time: ${((-1 * v0) + Math.sqrt((v0 * v0) - (2 * a * (-1 * delx))))/a} OR ${((-1 * v0) - Math.sqrt((v0 * v0) - (2 * a * (-1 * delx))))/a}... This is because it evalutes to a quadratic equation, and the quadratic formula yields 2 results.`
            }else if (v0 == null) {
                //delta(x) = 1/2 * a * t^2 + v0 * t
                //delx - 1/2at^2 = v0t
                // (delx - 1/2at^2)/t = v0
                v0 = (delx - (0.5 * a * t * t))/t
                createATGraph(a, t)
                createVTGraph(a, t, v0)
                return `Initial Velocity: ${(delx - (0.5 * a * t * t))/t}`
            }
        } catch (error) {
            return `Something went wrong. Please re-enter your values. (Error:${error})`            
        }
    }else {
        return 'Not enough values. (Or too many). Make sure you have 3.'
    }

}
function solveEquation2(vf, a, delx, vi) { //Should be working.... TODO: Further testing
    let valarray = [vf, a, delx, vi];
    let nulls = 0;
    for (let index = 0;index < valarray.length; index++) {
        const element = valarray[index]
        if (element == '') {
            valarray[index] = null
            nulls++
        }else {
            valarray[index] = parseFloat(element)
        }
    }
    vf = valarray[0]
    a = valarray[1]
    delx = valarray[2]
    vi = valarray[3]
    if (nulls == 1) {
        try {
            if (vf == null) {
                // vf = sqrt(2a * delx + vi^2)
                vf = (Math.sqrt(2*a * delx + (vi * vi)))
                createATGraph(a, (vf-vi)/a)
                createVTGraph(a, (vf-vi)/a, vi)
                return `Final Velocity: ${(Math.sqrt(2*a * delx + (vi * vi)))}`
            }else if (a == null) {
                // vf = sqrt(2a * delx + vi^2)
                // vf^2 = 2a * delx + vi^2
                // (vf^2 - vi^2)/(2 * delx) = a
                a = (vf * vf - (vi * vi))/(2 * delx)
                createATGraph(a, (vf-vi)/a)
                createVTGraph(a, (vf-vi)/a, vi)                
                return `Acceleration: ${(vf * vf - (vi * vi))/(2 * delx)}`
            }else if (delx == null) {
                // vf = sqrt(2a * delx + vi^2)
                // vf^2 = 2a + vi^2 * delx
                // delx = (vf * vf - vi^2)/(2 * a)
                delx = (((vf * vf)-(vi * vi))/(2 * a))
                createATGraph(a, (vf-vi)/a)
                createVTGraph(a, (vf-vi)/a, vi)
                return `Change in X: ${(((vf * vf)-(vi * vi))/(2 * a))}`

            }else if (vi == null) {
                //vf^2 = 2a*delx + vi^2
                //vf^2-2adelx = vi^2
                vi = Math.sqrt((vf * vf)-(2 * a *delx))
                createATGraph(a, (vf-vi)/a)
                createVTGraph(a, (vf-vi)/a, vi)
                return `Initial Velocity: ${Math.sqrt((vf * vf)-(2 * a *delx))}`
            }
            
        } catch (error) {
            return `Something went wrong. Please re-enter your values. (Error:${error})`            
        }
    }else {
        return 'Not enough values. (Or too many). Make sure you have 3.'
    }

};
function solveEquation1(v, a, t, v0) {
    let valarray = [v, a, t, v0]
    let nulls = 0;
    for (let index = 0; index < valarray.length; index++) {
        const element = valarray[index];
        console.log(element)
        if (element == '') {
            valarray[index] = null
            console.log(valarray[index])
        }else {
            valarray[index] = parseFloat(element)

        }
        
    }
    
    // console.log([v, a, t, v0])
    valarray.forEach(element => {
        // console.log(element)
        if (element == null) {
            nulls++;
        }
        
    });
    // console.log([v, a, t, v0])
    // console.log(nulls)
    v = valarray[0]
    a = valarray[1]
    t = valarray[2]
    v0 = valarray[3]
    console.log(valarray)
    if (nulls == 1){
        try {
            if (v == null) {
                // v = at + v0
                v = a * t +v0
                createATGraph(a, t)
                createVTGraph(a, t, v0)
                createXTGraph(a, t, v0)
                
                return `Final Velocity: ${a * t + v0}`;
            }else if (a == null) {
                // v = at + v0
                // v - v0 = at
                // (v-v0)/t = a
                a = (v-v0)/t
                createATGraph(a, t)
                createVTGraph(a, t, v0)
                createXTGraph(a, t, v0)

                return `Acceleration: ${(v-v0)/t}`
            }else if (t == null) {
                //v = at + v0
                //(v-v0) = at
                // (v-v0)/a = t
                t = (v-v0)/a
                createATGraph(a, t)
                createVTGraph(a, t, v0)
                createXTGraph(a, t, v0)


                return `Time: ${(v-v0)/a}`
            }else if (v0 == null) {
                //v = at + v0
                // v- at = v0
                v0 = v-(a*t)
                createATGraph(a, t)
                createVTGraph(a, t, v0)
                createXTGraph(a, t, v0)


                return `Initial Velocity: ${v-(a*t)}`
            }
            
        } catch (error) {
            return `Something went wrong. Please re-enter your values. (Error:${error})`
        }

    }else {
        return 'Not enough values. (Or too many). Make sure you have 3.'
    }
}
document.addEventListener('DOMContentLoaded', ready)