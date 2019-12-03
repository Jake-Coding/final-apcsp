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

    }else if (equation == 'eq3') {
        document.forms.equation3.classList.remove('hidden')

    };

};
function solveEquation1(v, a, t, v0) {
    valarray = [v, a, t, v0]
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
                return `v = ${a * t + v0}`;
            }else if (a == null) {
                // v = at + v0
                // v - v0 = at
                // (v-v0)/t = a
                return `a = ${(v-v0)/t}`
            }else if (t == null) {
                //v = at + v0
                //(v-v0) = at
                // (v-v0)/a = t
                return `t = ${(v-v0)/a}`
            }else if (v0 == null) {
                //v = at + v0
                // v- at = v0
                return `Initial Velocity: ${v-(a*t)}`
            }
            
        } catch (error) {
            return `Something went wrong. Please re-enter your values. (Error:${error}`
        }

    }else {
        return 'Not enough values. (Or too many). Make sure you have 3.'
    }
}
document.addEventListener('DOMContentLoaded', ready)