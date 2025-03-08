import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import image from "../assets/demo.png";

const Landing = () => {
  return (
    <div>
      <Header />
      <Hero />
      <section>
        <section>
          <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
              <div class="md:col-span-2">
                <div class="max-w-lg md:max-w-none">
                  <h2 class="text-2xl font-semibold text-gray-900 sm:text-3xl">
                    How It Works
                  </h2>

                  <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      Secret Messages
                    </h2>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>
                        <strong>Compose your message</strong> – Write your
                        secret note.
                      </li>
                      <li>
                        <strong>Generate a unique link</strong> – Share it with
                        your recipient.
                      </li>
                      <li>
                        <strong>Read once, then disappear</strong> – Once
                        opened, it’s deleted forever.
                      </li>
                      <li>
                        <strong>Time-sensitive deletion</strong> – If unopened,
                        it expires in 24 hours.
                      </li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
                      Anonymous Confessions
                    </h2>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>
                        <strong>Write your confession</strong> – No sign-up
                        required.
                      </li>
                      <li>
                        <strong>Submit anonymously</strong> – Your identity
                        stays hidden.
                      </li>
                      <li>
                        <strong>Others can react</strong> – Confessions appear
                        on the public feed.
                      </li>
                      <li>
                        <strong>Auto-cleanup</strong> – Old confessions get
                        removed regularly.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="md:col-span-2">
                <img src={image} class="rounded" alt="" />
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
