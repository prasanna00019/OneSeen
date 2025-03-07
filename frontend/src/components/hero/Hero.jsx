import React from "react";
import logo from "../../assets/logo.svg";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Button } from "../ui/button";

const Hero = () => {
  const { login } = useKindeAuth();
  return (
    <div>
      <section class="bg-white">
        <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div class="mx-auto max-w-xl text-center">
            <h1 class="text-3xl font-extrabold sm:text-5xl">
              Share your thoughts
              <strong class="font-extrabold text-primary sm:block">
                {" "}
                anonymously.{" "}
              </strong>
            </h1>

            <p class="mt-4 sm:text-xl/relaxed">
              Welcome to OneSeen, the ultimate platform for secret confessions
              and one-time messages. Share your thoughts anonymously, send
              private messages that disappear after being read, and experience
              true digital secrecy.
            </p>

            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                class="block w-full hover:cursor-pointer rounded-full bg-primary px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-primary focus:ring-3 focus:outline-hidden sm:w-auto"
                onClick={login}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
