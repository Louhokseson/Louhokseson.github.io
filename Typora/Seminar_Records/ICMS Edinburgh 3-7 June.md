# ICMS Edinburgh 3-7 June

Location: [Bayes Centre $5^{\text{th}}$ floor (turn right out of the lift)](https://www.google.com/maps/place/International+Centre+for+Mathematical+Sciences+(ICMS)/@55.9457153,-3.1873166,15z/data=!4m6!3m5!1s0x4887c7844f66b3b9:0x1610d5ed4335f0f7!8m2!3d55.9453099!4d-3.1872381!16s%2Fg%2F11cn14gg8d?entry=ttu)

## Modelling particle-laden turbulent flows with neural stochastic differential equations

Speaker: **Josh Williams**, STFC Hartree Centre

Large eddy simulation/ Navier-Stokes equation

timescale for the friction?? What is this?

Feed-forward Neural Network

## Network inference in a stochastic multi-population neural mass model via approximate Bayesian computation

Speaker: **Irene Tubikanec**, Johannes Kepler University Linz

Paper: https://arxiv.org/abs/2306.15787

Solving  6N-dimensional SDEs

stochastic Hamiltonian type of SDEs:

Numerical method:

**Mean-square convergent** of order

Splitting method

Fourier Transform in nSMC-ABC algorithm maybe link the Memory friction

## High Rank Path Development: an approach of learning the filtration of stochastic processes

Speaker: **Hao Ni**, University College London

Hilbert-Schmidt distance: (distance of two matrices)

Too theoretical for me. So many notation about space. Couldn't follow during the talk.

## Learning mean field models from data

Speaker: **Grigoris Pavliotis**, Imperial College London

Papers: [Related to Non-Markovian](https://arxiv.org/pdf/1805.04959) and [Mean Field Limit in SDE](https://epubs.siam.org/doi/epdf/10.1137/22M153848X)

Mean field limits

McKean–Vlasov process: [wiki](https://en.wikipedia.org/wiki/McKean–Vlasov_process) or Mean Field Limit in SDE (Fokker-Planck equation of a interacting parcticles process)



We consider the following system of one-dimensional interacting particles over the time interval $[0,T]$
$$
\begin{equation} \label{eq:systemIP}
\begin{aligned}
\mathrm{d} X_t^{(n)} &= f(X_t^{(n)};\alpha) \,\mathrm{d} t + \frac1N \sum_{i=1}^{N} g(X_t^{(n)} - X_t^{(i)};\gamma) \,\mathrm{d} t + \sqrt{2 h(X_t^{(n)};\sigma)} \,\mathrm{d} B_t^{(n)}, \\
X_0^{(n)} &\sim \nu, \qquad n = 1, \dots, N,
\end{aligned}
\end{equation}
$$
where $N$ is the number of particles, $\{ (B_t^{(n)})_{t\in[0,T]} \}_{n=1}^N$ are standard independent one dimensional Brownian motions, and $\nu$ is the initial distribution of the particles, which is assumed to be independent of the Brownian motions $\{ (B_t^{(n)})_{t\in[0,T]} \}_{n=1}^N$. We remark that we assume chaotic initial conditions, meaning that all the particles are initially distributed according to the same measure. The functions $f,g$ and $h$ are the drift, interaction, and diffusion functions, respectively, which depend on some parameters $\alpha \in \R^{J+1}, \gamma \in \R^{K+1}$ and $\sigma \in \R^{L+1}$​. 

We focus our attention on large systems, i.e., when the number of interacting particles is $N \gg 1$, and therefore it is reasonable to look at the mean field limit (see, e.g., \cite{Daw83,Gar88}), which provides a good approximation of the behavior of a single particle in the system. In particular, letting $N \to \infty$ in $\eqref{eq:systemIP}$ we obtain the nonlinear, in the sense of McKean, SDE
$$
\begin{equation} \label{eq:MFL}
\begin{aligned} 
\mathrm{d} X_t &= f(X_t;\alpha) \,\mathrm{d} t + (g(\cdot;\gamma) * u(\cdot,t))(X_t) \,\mathrm{d} t + \sqrt{2h(X_t;\sigma)} \,\mathrm{d} B_t, \\
X_0 &\sim \nu,
\end{aligned}
\end{equation}
$$
where $u(\cdot;t)$ is the density with respect to the Lebesgue measure of the law of $X_t$, and satisfies the nonlinear *Fokker--Planck equation* named **McKean--Vlasov equation**
$$
\begin{equation} 
\begin{aligned}
\frac{\partial u}{\partial t}(x,t) &= -\frac{\partial}{\partial x} \left( f(x;\alpha)u(x,t) + (g(\cdot;\gamma)*u(\cdot,t))(x)u(x,t) \right) + \frac{\partial^2}{\partial x^2} \left( h(x;\sigma) u(x,t) \right), \\
u(x,0) \,\mathrm{d} x &= \nu(\mathrm{d} x).
\end{aligned}
\end{equation}
$$
