const response = await request.post('https://reqres.in/api/users', {
  data: {
    name: "Deepan",
    job: "QA"
  }
});

expect(response.status()).toBe(201);