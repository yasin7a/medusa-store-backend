import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { useLayoutEffect } from "react";

const LoginCustomizationsWidget = () => {
  useLayoutEffect(() => {
    const el = document.querySelector(".custom-login-area");
    if (el && el.parentElement) {
      const wrapper = el.parentElement;
      const parent = wrapper.parentElement;

      if (parent) {
        if (parent.children[0] && parent.children[0] !== wrapper) {
          parent.removeChild(parent.children[0]);
        }
        if (parent.children[0] && parent.children[0] !== wrapper) {
          parent.removeChild(parent.children[0]);
        }
      }
    }
  }, []);

  return (
    <>
      <div className="custom-login-area text-center mb-4">
        <h1 className="text-xl font-medium  ">Welcome back</h1>
        <p className="mt-2 text-sm  font-normal">
          Sign in to continue to your account.
        </p>
      </div>
    </>
  );
};

export const config = defineWidgetConfig({
  zone: "login.before",
});

export default LoginCustomizationsWidget;
