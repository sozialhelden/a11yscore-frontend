export const loader = () => {
  return new Response(JSON.stringify({ health: "ok" }), {
    headers: {
      "Content-Type": "application/json; utf-8",
    },
  });
};
