// Verified edge-traversal percentage datasets on Board 6 (NEJD, 15 edges).
// Edge order matches Crist et al., Antiquity (2026), Figure 4, Board 6:
//   0: bot-left, 1: bot-right, 2: low-left, 3: low-right, 4: up-right, 5: up-left,
//   6: top-left, 7: top-right, 8: mid-left, 9: mid-right, 10: CENTRE,
//   11: bot-left diag, 12: bot-right diag (worn), 13: top-right diag, 14: top-left diag.

export const WEAR_SETS = {
  // View 1: Same game (4 Hounds vs. 2 Hares SP1), four different simulated player models
  sameGame: {
    intro:
      'All four maps below simulate the exact same rulebook (4 hounds vs. 2 hares, starting position 1) on the same 10-point board. Only the simulated player changes—yet the wear pattern shifts dramatically.',
    cards: [
      {
        id: 'crist-pub',
        title: 'Crist et al. (2026) published table',
        subtitle: 'Alpha-Beta AI (mobility heuristic, symmetry-aligned)',
        diag: 15.06,
        centre: 0.01,
        note: 'Clears the 13.33% diagonal bar; zero center-line traffic.',
        pcts: [6.97, 11.07, 1.25, 9.63, 8.34, 1.61, 7.02, 12.34, 1.12, 0.32, 0.01, 5.99, 15.06, 13.34, 5.94],
      },
      {
        id: 'exact-opt',
        title: 'Exact optimal play (unbiased ties)',
        subtitle: '2,000 simulated games · symmetry-aligned',
        diag: 12.73,
        centre: 1.60,
        note: 'Falls just under 13.33% once arbitrary move-order bias is removed.',
        pcts: [9.97, 9.45, 0.77, 7.44, 14.40, 5.03, 4.22, 10.22, 0.64, 3.81, 1.60, 3.67, 7.26, 12.73, 8.79],
      },
      {
        id: 'noisy-sim',
        title: 'Noisy simulated play (occasional mistakes)',
        subtitle: '2,000 stochastic games (β = 1) · symmetry-aligned',
        diag: 9.64,
        centre: 4.91,
        note: 'Traffic spreads across the board; no diagonal stands out sharply.',
        pcts: [5.86, 6.21, 4.02, 9.24, 9.85, 5.94, 7.40, 6.20, 4.80, 8.51, 4.91, 5.07, 9.64, 4.57, 7.80],
      },
      {
        id: 'mcts-sim',
        title: 'Trial-and-error AI (MCTS / UCT)',
        subtitle: '120 games · no built-in blocking heuristic',
        diag: 7.12,
        centre: 4.58,
        note: 'Remove the mobility heuristic and the diagonal drops to near-average (6.67%).',
        pcts: [6.57, 5.99, 3.83, 7.44, 13.62, 6.96, 6.82, 6.47, 4.82, 6.48, 4.58, 5.66, 7.12, 6.58, 7.08],
      },
    ],
  },

  // View 2: Four different rulebooks on the same 10-point board
  fourGames: {
    intro:
      'Compare four rulebooks on the same board. Three hounds against one hare (no retreat) sends roughly half of all moves into the bottom corners; three-in-a-row and capture games also keep the center line light.',
    cards: [
      {
        id: 'hunt31-opt',
        title: '3 Hounds vs. 1 Hare (no retreat)',
        subtitle: 'Exact optimal play · hounds move first · H-aligned',
        diag: 13.54,
        centre: 4.43,
        note: '54.5% of all moves fall in the bottom triangles vs. 22.8% at the top.',
        pcts: [7.88, 9.85, 6.45, 7.10, 4.92, 4.10, 3.85, 4.42, 7.60, 8.20, 4.43, 9.68, 13.54, 4.02, 3.96],
      },
      {
        id: 'hunt31-rand',
        title: '3 Hounds vs. 1 Hare (random moves)',
        subtitle: '3,000 random games · hare escapes 66% of the time',
        diag: 9.05,
        centre: 6.23,
        note: 'Even under completely random moves, 47.5% of traffic lands in the bottom end.',
        pcts: [7.55, 8.65, 6.90, 7.15, 5.45, 5.10, 5.20, 5.35, 7.80, 7.62, 6.23, 8.20, 9.05, 5.05, 4.70],
      },
      {
        id: 'line-mcts',
        title: 'Roman Three-in-a-Row (MCTS)',
        subtitle: '120 trial-and-error games · median 13 slides',
        diag: 12.02,
        centre: 6.74,
        note: 'Decisive games without artificial 250-move loops; heavy diagonal traffic.',
        pcts: [4.24, 5.09, 4.69, 15.91, 3.92, 4.35, 14.31, 2.99, 5.41, 5.55, 6.74, 5.88, 4.01, 12.02, 4.90],
      },
      {
        id: 'lat-free',
        title: 'Pocket Latrunculi (4-vs-4 capture)',
        subtitle: '300 minimax games · free placement · median 14 slides',
        diag: 15.41,
        centre: 5.55,
        note: 'Flanking diagonals see heavy use while the 2-point center stays quiet.',
        pcts: [5.25, 7.60, 6.40, 7.95, 5.50, 5.20, 4.85, 5.15, 6.35, 6.20, 5.55, 6.60, 15.41, 6.20, 5.79],
      },
    ],
  },
};
