import React, { useState } from "react";
import "./style.css"; // Import CSS for styling
import AceEditor from "react-ace";

const Explore = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [outputContent, setOutputContent] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const pro1 = [
    {
      name: "Goddard problem ",
      julia_code:
        "\n        t0 = 0      # initial time\n        r0 = 1      # initial altitude\n        v0 = 0      # initial speed\n        m0 = 1      # initial mass\n        vmax = 0.1  # maximal authorized speed\n        mf = 0.6    # final mass to target\n        \n        @def ocp begin # definition of the optimal control problem\n        \n            tf, variable\n            t ∈ [ t0, tf ], time\n            x ∈ R³, state\n            u ∈ R, control\n        \n            r = x₁\n            v = x₂\n            m = x₃\n        \n            x(t0) == [ r0, v0, m0 ]\n            m(tf) == mf,         (1)\n            0 ≤ u(t) ≤ 1\n            r(t) ≥ r0\n            0 ≤ v(t) ≤ vmax\n        \n            ẋ(t) == F0(x(t)) + u(t) * F1(x(t))\n        \n            r(tf) → max\n        \n        end;\n        \n        # Dynamics\n        const Cd = 310\n        const Tmax = 3.5\n        const β = 500\n        const b = 2\n        \n        F0(x) = begin\n            r, v, m = x\n            D = Cd * v^2 * exp(-β*(r - 1)) # Drag force\n            return [ v, -D/m - 1/r^2, 0 ]\n        end\n        \n        F1(x) = begin\n            r, v, m = x\n            return [ 0, Tmax/m, -b*Tmax ]\n        end\n     direct_sol = solve(ocp, grid_size=100)",
      ansi_code: " ",
    },
    {
      name: "Double integrator energy",
      julia_code:
        "using CTProblems\nprob = Problem(:integrator, :energy, :x_dim_2, :u_dim_1, :lagrange, :noconstraints)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R\u00b2, state",
        "u \u2208 R, control",
        "x(t0) == [-1, 0], initial_con",
        "x(tf) == [0, 0], final_con",
        "\u1e8b(t) == A * x(t) + B * u(t)",
        "\u222b(0.5 * u(t) ^ 2) \u2192 min",
      ],
    },
    {
      name: "Double integrator energy cc",
      julia_code:
        "using CTProblems\nprob = Problem(:integrator, :energy, :x_dim_2, :u_dim_1, :lagrange, :u_cons)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R\u00b2, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "x(tf) == xf, final_con",
        "-\u03b3 \u2264 u(t) \u2264 \u03b3, u_con",
        "\u1e8b(t) == A * x(t) + B * u(t)",
        "\u222b(0.5 * u(t) ^ 2) \u2192 min",
      ],
    },
    {
      name: "Double integrator energy distance",
      julia_code:
        "using CTProblems\nprob = Problem(:integrator, :energy, :distance, :x_dim_2, :u_dim_1, :bolza)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R\u00b2, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "\u1e8b(t) == A * x(t) + B * u(t)",
        "-0.5 * x\u2081(tf) + \u222b(0.5 * u(t) ^ 2) \u2192 min",
      ],
    },
    {
      name: "Double integrator energy sc",
      julia_code:
        "using CTProblems\nprob = Problem(:integrator, :energy, :x_dim_2, :u_dim_1, :lagrange, :x_cons, :order_2)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R\u00b2, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "x(tf) == xf, final_con",
        "-Inf \u2264 x\u2081(t) \u2264 l, x_con",
        "\u1e8b(t) == A * x(t) + B * u(t)",
        "\u222b(0.5 * u(t) ^ 2) \u2192 min",
      ],
    },
    {
      name: "Double integrator time",
      julia_code:
        "using CTProblems\nprob = Problem(:integrator, :time, :x_dim_2, :u_dim_1, :mayer, :u_cons)",
      ansi_code: [
        "tf \u2208 R, variable",
        "t \u2208 [t0, tf], time",
        "x \u2208 R\u00b2, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "x(tf) == xf, final_con",
        "-\u03b3 \u2264 u(t) \u2264 \u03b3, u_con",
        "\u1e8b(t) == A * x(t) + B * u(t)",
        "tf \u2192 min",
      ],
    },
    {
      name: "Goddard",
      julia_code: "using CTProblems",
      ansi_code: [
        "Cd = 310",
        "Tmax = 3.5",
        "\u03b2 = 500",
        "b = 2",
        "t0 = 0",
        "r0 = 1",
        "v0 = 0",
        "vmax = 0.1",
        "m0 = 1",
        "mf = 0.6",
        "x0 = [r0, v0, m0]",
        "tf \u2208 R, variable",
        "t \u2208 [t0, tf], time",
        "x \u2208 R\u00b3, state",
        "u \u2208 R, control",
        "r = x\u2081",
        "v = x\u2082",
        "m = x\u2083",
        "0 \u2264 u(t) \u2264 1, u_con",
        "r(t) \u2265 r0, x_con_rmin",
        "0 \u2264 v(t) \u2264 vmax, x_con_vmax",
        "x(t0) == x0, initial_con",
        "m(tf) == mf, final_con",
        "\u1e8b(t) == F0(x(t)) + u(t) * F1(x(t))",
        "r(tf) \u2192 max",
      ],
    },
    {
      name: "LQR",
      julia_code:
        "using CTProblems\nprob = Problem(:lqr, :x_dim_2, :u_dim_1, :lagrange)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R\u00b2, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "\u1e8b(t) == A * x(t) + B * u(t)",
        "\u222b(0.5 * (x\u2081(t) ^ 2 + x\u2082(t) ^ 2 + u(t) ^ 2)) \u2192 min",
      ],
    },
    {
      name: "Orbital transfert consumption",
      julia_code:
        "using CTProblems\nprob = Problem(:orbital_transfert, :consumption)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R\u2074, state",
        "u \u2208 R\u00b2, control",
        "x(t0) == x0, initial_con",
        "[norm((x(tf))[1:2]) - rf, x\u2083(tf) + \u03b1 * x\u2082(tf), x\u2084(tf) - \u03b1 * x\u2081(tf)] == [0, 0, 0], boundary_con",
        "0 \u2264 norm(u(t)) \u2264 1, u_con",
        "\u1e8b(t) == A * [(-\u03bc * x\u2081(t)) / sqrt(x\u2081(t) ^ 2 + x\u2082(t) ^ 2) ^ 3; (-\u03bc * x\u2082(t)) / sqrt(x\u2081(t) ^ 2 + x\u2082(t) ^ 2) ^ 3; x\u2083(t); x\u2084(t)] + B * u(t)",
        "\u222b(norm(u(t))) \u2192 min",
      ],
    },
    {
      name: "Orbital transfert energy",
      julia_code:
        "using CTProblems\nprob = Problem(:orbital_transfert, :energy)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R\u2074, state",
        "u \u2208 R\u00b2, control",
        "x(t0) == x0, initial_con",
        "[norm((x(tf))[1:2]) - rf, x\u2083(tf) + \u03b1 * x\u2082(tf), x\u2084(tf) - \u03b1 * x\u2081(tf)] == [0, 0, 0], boundary_con",
        "0 \u2264 norm(u(t)) \u2264 1, u_con",
        "\u1e8b(t) == A * [(-\u03bc * x\u2081(t)) / sqrt(x\u2081(t) ^ 2 + x\u2082(t) ^ 2) ^ 3; (-\u03bc * x\u2082(t)) / sqrt(x\u2081(t) ^ 2 + x\u2082(t) ^ 2) ^ 3; x\u2083(t); x\u2084(t)] + B * u(t)",
        "\u222b(0.5 * (u\u2081(t) ^ 2 + u\u2082(t) ^ 2)) \u2192 min",
      ],
    },
    {
      name: "Orbital transfert time",
      julia_code: "using CTProblems\nprob = Problem(:orbital_transfert, :time)",
      ansi_code: [
        "tf \u2208 R, variable",
        "t \u2208 [t0, tf], time",
        "x \u2208 R\u2074, state",
        "u \u2208 R\u00b2, control",
        "x(t0) == x0, initial_con",
        "[norm((x(tf))[1:2]) - rf, x\u2083(tf) + \u03b1 * x\u2082(tf), x\u2084(tf) - \u03b1 * x\u2081(tf)] == [0, 0, 0], boundary_con",
        "0 \u2264 norm(u(t)) \u2264 \u03b3_max, u_con",
        "\u1e8b(t) == A * [(-\u03bc * x\u2081(t)) / sqrt(x\u2081(t) ^ 2 + x\u2082(t) ^ 2) ^ 3; (-\u03bc * x\u2082(t)) / sqrt(x\u2081(t) ^ 2 + x\u2082(t) ^ 2) ^ 3; x\u2083(t); x\u2084(t)] + B * u(t)",
        "tf \u2192 min",
      ],
    },
    {
      name: "Simple exponential consumption",
      julia_code:
        "using CTProblems\nprob = Problem(:exponential, :consumption)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "x(tf) == xf, final_con",
        "-1 \u2264 u(t) \u2264 1, u_con",
        "\u1e8b(t) == -(x(t)) + u(t)",
        "\u222babs(u(t)) \u2192 min",
      ],
    },
    {
      name: "Simple exponential energy",
      julia_code: "using CTProblems\nprob = Problem(:exponential, :energy)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "x(tf) == xf, final_con",
        "\u1e8b(t) == -(x(t)) + u(t)",
        "\u222b(0.5 * u(t) ^ 2) \u2192 min",
      ],
    },
    {
      name: "Simple exponential time",
      julia_code: "using CTProblems\nprob = Problem(:exponential, :time)",
      ansi_code: [
        "tf \u2208 R, variable",
        "t \u2208 [t0, tf], time",
        "x \u2208 R, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "x(tf) == xf, final_con",
        "-\u03b3 \u2264 u(t) \u2264 \u03b3, u_con",
        "\u1e8b(t) == -(x(t)) + u(t)",
        "tf \u2192 min",
      ],
    },
    {
      name: "Simple integrator energy",
      julia_code:
        "using CTProblems\nprob = Problem(:integrator, :energy, :free_final_time, :x_dim_1, :u_dim_1, :lagrange)",
      ansi_code: "",
    },
    {
      name: "Simple integrator lqr",
      julia_code:
        "using CTProblems\nprob = Problem(:integrator, :lqr, :free_final_time, :x_dim_1, :u_dim_1, :bolza)",
      ansi_code: "",
    },
    {
      name: "Simple integrator mixed constraint",
      julia_code:
        "using CTProblems\nprob = Problem(:integrator, :x_dim_1, :u_dim_1, :lagrange, :mixed_constraint)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "0 \u2264 u(t) \u2264 +Inf, u_con",
        "-Inf \u2264 x(t) + u(t) \u2264 0, mixed_con",
        "\u1e8b(t) == u(t)",
        "\u222b(-(u(t))) \u2192 min",
      ],
    },
    {
      name: "Simple integrator turnpike",
      julia_code:
        "using CTProblems\nprob = Problem(:turnpike, :integrator, :state_energy, :x_dim_1, :u_dim_1, :lagrange, :u_cons, :singular_arc)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "x(tf) == xf, final_con",
        "-1 \u2264 u(t) \u2264 1, u_con",
        "\u1e8b(t) == u(t)",
        "\u222b(x(t) ^ 2) \u2192 min",
      ],
    },
    {
      name: "Simple integrator non autonomous",
      julia_code:
        "using CTProblems\nprob = Problem(:integrator, :state_dime_1, :lagrange, :x_cons, :u_cons, :nonautonomous)",
      ansi_code: [
        "t \u2208 [t0, tf], time",
        "x \u2208 R, state",
        "u \u2208 R, control",
        "x(t0) == x0, initial_con",
        "0 \u2264 u(t) \u2264 3, u_con",
        "-Inf \u2264 (1 - x(t)) - (t - 2) ^ 2 \u2264 0, x_con",
        "\u1e8b(t) == u(t)",
        "\u222b(exp(-\u03b1 * t) * u(t)) \u2192 min",
      ],
    },
  ];

  const pro = [
    {
      name: "Double integrator consumption ",
      julia_code:
        "\nt0=0\ntf=1\nx0=[-1, 0]\nxf=[0, 0]\nγ = 5\nA = [0 1\n\t     0 0]\nB = [0\n\t\t    1]\n\n@def ocp begin\n t ∈ [ t0, tf ], time\n    x ∈ R², state\n    u ∈ R, control\n    x(t0) == x0, (initial_con)\n    x(tf) == xf, (final_con)\n    -γ ≤ u(t) ≤ γ, (u_con)\n    ẋ(t) == A * x(t) + B * u(t)\n    ∫abs(u(t)) → min\nend\n",
    },
    {
      name: "Double integrator energy",
      julia_code:
        "\nt0=0\n\ttf=1\n\tx0=[-1, 0]\n\txf=[0, 0]\n\tA = [ 0 1\n\t       0 0 ]\n\tB = [ 0\n\t\t      1 ]\n\n\t@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R², state\n\t    u ∈ R, control\n\t    x(t0) == [-1, 0], (initial_con)\n\t    x(tf) == [0, 0], (final_con)\n\t    ẋ(t) == A * x(t) + B * u(t)\n\t    ∫(0.5u(t)^2) → min\n\tend\n",
    },
    {
      name: "Double integrator energy control constraint",
      julia_code:
        "\nt0=0\ntf=1\nx0=[-1, 0]\nxf=[0, 0]\nγ = 5\nA = [ 0 1\n\t    0 0 ]\n\tB = [ 0\n\t    1 ]\n\n\t@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R², state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    x(tf) == xf, (final_con)\n\t    -γ ≤ u(t) ≤ γ, (u_con)\n\t    ẋ(t) == A * x(t) + B * u(t)\n\t    ∫(0.5u(t)^2) → min\n\tend\n",
    },
    {
      name: "Double integrator energy distance",
      julia_code:
        "\nt0=0\ntf=1\nx0=[0, 0]\nA = [ 0 1\n\t    0 0 ]\nB = [ 0\n\t    1 ]\n\n@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R², state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    ẋ(t) == A * x(t) + B * u(t)\n\t    -0.5x₁(tf) + ∫(0.5u(t)^2) → min\nend\n",
    },
    {
      name: "Double integrator energy state constraint",
      julia_code:
        "\nt0=0\ntf=1\nx0=[0, 1]\nxf=[0, -1]\nl = 1/9\nA = [ 0 1\n\t    0 0 ]\nB = [ 0\n\t    1 ]\n\n@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R², state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    x(tf) == xf, (final_con)\n\t    -Inf ≤ x₁(t) ≤ l, (x_con)\n\t    ẋ(t) == A * x(t) + B * u(t)\n\t    ∫(0.5u(t)^2) → min\nend\n",
    },
    {
      name: "Double integrator time",
      julia_code:
        "\nt0=0\nx0=[-1, 0]\nxf=[0, 0]\nγ = 1\nA = [ 0 1\n\t      0 0 ]\nB = [ 0\n\t      1 ]\n\n@def ocp begin\n\t    tf ∈ R, variable\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R², state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    x(tf) == xf, (final_con)\n\t    -γ ≤ u(t) ≤ γ, (u_con)\n\t    ẋ(t) == A * x(t) + B * u(t)\n\t    tf → min\nend\n",
    },
    {
      name: "LQR",
      julia_code:
        "\nt0=0\ntf=5\nx0=[0, 1]\nA = [0 1; -1 0]\nB = [0; 1]\n\n@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R², state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    ẋ(t) == A * x(t) + B * u(t)\n\t    ∫(0.5*(x₁(t)^2 + x₂(t)^2 + u(t)^2)) → min\nend\n",
    },
    {
      name: "Orbital transfert consumption",
      julia_code:
        "\n x0 = [-42272.67, 0, 0, -5796.72]\nμ = 5.1658620912*1e12\nrf = 42165.0;\nrf3 = rf^3;\nm0 = 2000.0\nF_max = 100.0\nγ_max = F_max*3600.0^2/(m0*10^3)\nt0 = 0.0\nα = sqrt(μ/rf3);\nβ = 0.0\n\ntol = 1e-9;\n\nF_max_100 = 100.0\n\ntf_min = 13.40318195708344 # minimal time for Fmax = 100 N\ntf = 1.5*tf_min\n\nTh(F) = F*3600.0^2/(10^3)\nu_max = Th(F_max)\n\nA = [ 0 0 1 0; 0 0 0 1; 1 0 0 0; 0 1 0 0]\nB = [ 0 0; 0 0; γ_max 0; 0 γ_max ]\n\n@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R⁴, state\n\t    u ∈ R², control\n\t    x(t0) == x0, (initial_con)\n\t    [norm(x(tf)[1:2])-rf, x₃(tf) + α*x₂(tf), x₄(tf) - α*x₁(tf)] == [0,0,0], (boundary_con)\n\t    0 ≤ norm(u(t)) ≤ 1, (u_con)\n\t    ẋ(t) == A*([-μ*x₁(t)/(sqrt(x₁(t)^2 + x₂(t)^2)^3);-μ*x₂(t)/(sqrt(x₁(t)^2 + x₂(t)^2)^3);x₃(t);x₄(t)]) + B*u(t)\n\t    ∫(norm(u(t))) → min\nend\n",
    },
    {
      name: "Orbital transfert energy",
      julia_code:
        "\nx0 = [-42272.67, 0, 0, -5796.72]\nμ = 5.1658620912*1.0e12\nrf = 42165.0;\nrf3 = rf^3;\nm0 = 2000.0\nF_max = 100.0\nγ_max = F_max*3600.0^2/(m0*10^3)\nt0 = 0.0\ntf = 20.0\nα = sqrt(μ/rf3);\nA = [ 0 0 1 0; 0 0 0 1; 1 0 0 0; 0 1 0 0]\nB = [ 0 0; 0 0; 1 0; 0 1 ]\n\n@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R⁴, state\n\t    u ∈ R², control\n\t    x(t0) == x0, (initial_con)\n\t    [norm(x(tf)[1:2])-rf, x₃(tf) + α*x₂(tf), x₄(tf) - α*x₁(tf)] == [0,0,0], (boundary_con)\n\t    0 ≤ norm(u(t)) ≤ 1, (u_con)\n\t    ẋ(t) == A*([-μ*x₁(t)/(sqrt(x₁(t)^2 + x₂(t)^2)^3);-μ*x₂(t)/(sqrt(x₁(t)^2 + x₂(t)^2)^3);x₃(t);x₄(t)]) + B*u(t)\n\t    ∫(0.5(u₁(t)^2 + u₂(t)^2)) → min\nend\n",
    },
    {
      name: "Orbital transfert time",
      julia_code:
        "\nx0 = [-42272.67, 0, 0, -5796.72] # état initial\nμ = 5.1658620912*1e12\nrf = 42165.0;\nrf3 = rf^3;\nm0 = 2000.0\nF_max = 100.0\nγ_max = F_max*3600.0^2/(m0*10^3)\nt0 = 0.0\nα = sqrt(μ/rf3);\nA = [ 0 0 1 0; 0 0 0 1; 1 0 0 0; 0 1 0 0]\nB = [ 0 0; 0 0; 1 0; 0 1 ]\nt0 = 0.0\n\n@def ocp begin\n\t    tf ∈ R, variable\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R⁴, state\n\t    u ∈ R², control\n\t    x(t0) == x0, (initial_con)\n\t    [norm(x(tf)[1:2])-rf, x₃(tf) + α*x₂(tf), x₄(tf) - α*x₁(tf)] == [0,0,0], (boundary_con)\n\t    0 ≤ norm(u(t)) ≤ γ_max, (u_con)\n\t    ẋ(t) == A*([-μ*x₁(t)/(sqrt(x₁(t)^2 + x₂(t)^2)^3);-μ*x₂(t)/(sqrt(x₁(t)^2 + x₂(t)^2)^3);x₃(t);x₄(t)]) + B*u(t)\n\t    tf → min\nend\n",
    },
    {
      name: "Simple exponential consumption",
      julia_code:
        "\nt0 = 0\ntf = 1\nx0 = -1\nxf = 0\n\n@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R, state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    x(tf) == xf, (final_con)\n\t    -1 ≤ u(t) ≤ 1, (u_con)\n\t    ẋ(t) == -x(t) + u(t)\n\t    ∫abs(u(t)) → min\nend\n",
    },
    {
      name: "Simple exponential energy",
      julia_code:
        "\nt0 = 0\ntf = 1\nx0 = -1\nxf = 0\n\n@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R, state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    x(tf) == xf, (final_con)\n\t    ẋ(t) == -x(t) + u(t)\n\t    ∫( 0.5u(t)^2 ) → min\nend\n",
    },
    {
      name: "Simple exponential time",
      julia_code:
        "\nt0 = 0\nx0 = -1\nxf = 0\nγ = 1\n\n@def ocp begin\n\t    tf ∈ R, variable\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R, state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    x(tf) == xf, (final_con)\n\t    -γ ≤ u(t) ≤ γ, (u_con)\n\t    ẋ(t) == -x(t) + u(t)\n\t    tf → min\nend\n",
    },
    {
      name: "Simple integrator energy",
      julia_code:
        "\nt0 = 0\nx0 = 0\n\n@def ocp begin\n\t    tf ∈ R, variable\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R, state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    x(tf) - tf - 10 == 0, (boundary_constraint)\n\t    ẋ(t) == u(t)\n\t    ∫( 0.5u(t)^2 ) → min\nend\n",
    },
    {
      name: "Simple integrator lqr",
      julia_code:
        "\nt0 = 0\nx0 = 0\nxf = 1\n\n@def ocp begin\n\t    tf ∈ R, variable\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R, state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    x(tf) == xf, (final_con)\n\t    ẋ(t) == u(t)\n\t    tf + ∫(0.5*(u(t)^2 + x(t)^2)) → min\nend\n",
    },
    {
      name: "Simple integrator mixed constraint",
      julia_code:
        "\nt0 = 0\ntf = 1\nx0 = -1\n\n@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R, state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    0 ≤ u(t) ≤ +Inf, (u_con)\n\t    -Inf ≤ x(t) + u(t) ≤ 0, (mixed_con)\n\t    ẋ(t) == u(t)\n\t    ∫(-u(t)) → min\nend\n",
    },
    {
      name: "Simple integrator turnpike",
      julia_code:
        "\nn = 1\nm = 1\nt0 = 0\ntf = 2\nx0 = 1\nxf = 0.5\n\n@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R, state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    x(tf) == xf, (final_con)\n\t    -1 ≤ u(t) ≤ 1, (u_con)\n\t    ẋ(t) == u(t)\n\t    ∫(x(t)^2) → min\nend\n",
    },
    {
      name: "Simple integrator non autonomous",
      julia_code:
        "\nn = 1\nm = 1\nt0 = 0\ntf = 3\nx0 = 0\nα = 1\n\n@def ocp begin\n\t    t ∈ [ t0, tf ], time\n\t    x ∈ R, state\n\t    u ∈ R, control\n\t    x(t0) == x0, (initial_con)\n\t    0 ≤ u(t) ≤ 3, (u_con)\n\t    -Inf ≤ 1 - x(t) - (t - 2)^2 ≤ 0, (x_con)\n\t    ẋ(t) == u(t)\n\t    ∫(exp(-α*t)*u(t)) → min\nend\n",
    },
  ];

  // + '\n\n # Plot the result \n plot(prob.solution, size=(700, 700))'
  const handleMenuItemClick = (juliaCode, item) => {
    setSelectedCode("#  " + item.name + "\n" + juliaCode);
    setOutputContent(item.ansi_code);
  };

  return (
    <div>
      <div>
        <nav
          className={`sidebar ${isSidebarOpen ? "close" : ""}`}
          style={{ width: "350px" }}
        >
          <header>
            <div className="text logo-text">
              <h3
                className="name custom-color"
                style={{ marginLeft: "25px", marginTop: "10px" }}
              >
                List Of Problems
              </h3>
            </div>
            <i
              className={`bx ${
                isSidebarOpen ? "bx-chevron-right" : "bx-chevron-left"
              } toggle`}
              onClick={toggleSidebar}
            ></i>
          </header>

          <div className="menu-bar">
            <div className="menu">
              <ul className="menu-links">
                {pro.map((item, index) => (
                  <li
                    className="nav-link"
                    key={index}
                    style={{ padding: "10px 8px", margin: "0" }}
                  >
                    <a
                      href="#"
                      onClick={() => handleMenuItemClick(item.julia_code, item)}
                    >
                      <i className={`bx ${item.icon} icon`}></i>
                      <span
                        className="text nav-text"
                        style={{
                          fontFamily: "Arial",
                          fontSize: "16px",
                          textAlign: "left",
                        }}
                      >
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bottom-content">
              <li className="">
                <a href="#">
                  <i className="bx bx-log-out icon"></i>
                  <span className="text nav-text">Go Back</span>
                </a>
              </li>
            </div>
          </div>
        </nav>
      </div>

      <div
        style={{
          paddingTop: "16px",
          width: "52%",
          marginLeft: "400px",
          marginTop: "16px",
          maxWidth: "3000",
          height: "600px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#24292e",
        }}
      >
        <AceEditor
          value={selectedCode}
          mode="julia"
          theme="github_dark"
          fontSize="16px"
          highlightActiveLine={true}
          setOptions={{
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
            tabSize: 2,
            useWorker: false,
          }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            backgroundColor: "#24292e",
          }}
          onChange={(newCode) => {
            setSelectedCode(newCode);
            setOutputContent("");
          }}
        />
      </div>

      <div
        style={{
          padding: "16px",
          width: "52%",
          marginLeft: "400px",
          marginTop: "16px",
          maxWidth: "3000",
          height: "200px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        {outputContent}
      </div>
    </div>
  );
};

export default Explore;
