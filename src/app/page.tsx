import { auth } from "../lib/auth";
import { CompBuilderLayout } from "../components/compBuilderLayout";

async function test() {
  const data = await auth.api.signUpEmail({
    body: {
      name: "John Doe", // required
      email: "john.doe@example.com", // required
      password: "password1234", // required
    },
  });
  console.log("Sign Up:", { data });
}

export default function Home() {
  // compRepo.getAll().then((res) => console.log(res));
  // test();
  // compRepo
  //   .create({
  //     name: "Test Competition",
  //     location: 1,
  //     date: new Date(),
  //   })
  //   .then((res) => console.log(res));
  // locationRepo
  //   .create({ name: "Test Location" })
  //   .then((res) => console.log(res));

  return (
    <main className="flex min-h-screen w-full  flex-col items-center justify-between py-32 px-16 bg-gray-100 dark:bg-black sm:items-start">
      <CompBuilderLayout />
    </main>
  );
}
