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
        
        console.log(selection.value)
    }
};
document.addEventListener('DOMContentLoaded', ready)