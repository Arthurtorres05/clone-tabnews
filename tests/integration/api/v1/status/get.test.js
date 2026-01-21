test("get to  /api/v1/status returns status 200", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  expect(res.status).toBe(200);
});
