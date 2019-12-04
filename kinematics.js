// Be able to put in some variables (t, a, v0, vf, x0, x, etc.) Can solve equations.
// Graphs for pos, vel, accel, time, etc.
// FUNCTIONS {
//    EQUATION 1: v = at + v0 (Given 3 of 4 [v, a, t, v0], can find last one)
//    EQUATION 2: vf = sqrt(2a * delta(x) + vi^2) (Given 3 of 4 [vf, a, delta(x), vi], can find last one)
//    EQUATION 3: delta(x) = 1/2 * a * t^2 + v0 * t (Given 3 of 4 [delta(x), a, t, v0] can find the last 1)
//}
function ready() {
    let selection = document.forms.eqSelect.elements.equation
    solve.onclick = function() {
        bringUpForm(selection.value)
        console.log(selection.value)
    }
};
function bringUpForm(equation)  {
    // console.log(document.forms.eqSelect.classList)
    document.forms.eqSelect.classList.add('hidden')
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

    };

};
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
                return `Final Velocity: ${(Math.sqrt(2*a * delx + (vi * vi)))}`
            }else if (a == null) {
                // vf = sqrt(2a * delx + vi^2)
                // vf^2 = 2a * delx + vi^2
                // (vf^2 - vi^2)/(2 * delx) = a
                return `Acceleration: ${(vf * vf - (vi * vi))/(2 * delx)}`
            }else if (delx == null) {
                // vf = sqrt(2a * delx + vi^2)
                // vf^2 = 2a + vi^2 * delx
                // delx = (vf * vf - vi^2)/(2 * a)
                return `Change in X: ${(((vf * vf)-(vi * vi))/(2 * a))}`

            }else if (vi == null) {
                //vf^2 = 2a*delx + vi^2
                //vf^2-2adelx = vi^2
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
                return `Final Velocity: ${a * t + v0}`;
            }else if (a == null) {
                // v = at + v0
                // v - v0 = at
                // (v-v0)/t = a
                return `Acceleration: ${(v-v0)/t}`
            }else if (t == null) {
                //v = at + v0
                //(v-v0) = at
                // (v-v0)/a = t
                return `Time: ${(v-v0)/a}`
            }else if (v0 == null) {
                //v = at + v0
                // v- at = v0
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