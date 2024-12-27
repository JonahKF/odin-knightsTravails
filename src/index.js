// Make list of valid movements a knight can take (ex. [2, 1], [-2, -1], etc.)
// Get start coordinates, end coordinates
// For the start coordinates, calculate each possible move. Then, enqueue those moves.
// Dequeue start, queue next coordinates. Find all possible moves for those coordinates.
// For each step, check if end coordinates are within possible coordinates.
// Track steps taken.

class Node {
  constructor(coordinates, path) {
    this.coordinates = coordinates;
    this.path = path; // Path will return as Array for final calculations
  }
}

const validMoves = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
];

const isValid = (coordinates) => {
  if (Array.isArray(coordinates) === false) return false;
  if (
    coordinates[0] < 0 ||
    coordinates[0] > 7 ||
    coordinates[1] < 0 ||
    coordinates[1] > 7
  )
    return false;

  return true;
};

const knightMoves = (start, end) => {
  if (!isValid(start) || !isValid(end)) {
    console.log("Invalid coordinates.");
    return;
  }

  if (start[0] === end[0] && start[1] === end[1]) {
    console.log("Starting coordinates match. 0 moves required.");
    return;
  }

  const findShortestPath = (start, end) => {
    const queue = [new Node(start, [start])]; // Path becomes array, with start coordinates as first item.
    const visited = new Set();

    while (queue.length > 0) {
      const current = queue.shift();
      if (current.coordinates === end.coordinates) {
        return current.path;
      }

      const [x, y] = current.coordinates;

      if (x === end[0] && y === end[1]) {
        return current.path;
      }

      for (const [dx, dy] of validMoves) {
        const newX = x + dx;
        const newY = y + dy;
        const newCoordinate = [newX, newY];

        if (isValid(newCoordinate) && !visited.has(newCoordinate)) {
          visited.add(newCoordinate);
          queue.push(new Node(newCoordinate, [...current.path, newCoordinate]));
        }
      }
    }
  };

  const shortestPath = findShortestPath(start, end);
  const steps = shortestPath.length - 1;

  console.log(`You made it in ${steps} moves! Here's your path:`);
  shortestPath.forEach((step) => console.log(step));
};

knightMoves([3, 5], [6, 1]);
