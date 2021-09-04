module.exports = {
  reactStrictMode: false,
  env: {
    MONGO_URI:
      "mongodb+srv://khadetou:KhadetouDyaniyamba96.@hotcodes.pflqn.mongodb.net/bookit?retryWrites=true&w=majority",
    CLOUDINARY_CLOUD_NAME: "didh3wbru",
    CLOUDINAR_API_KEY: "299593682714689",
    CLOUDINARY_API_SECRET: "5SLVYG27QnmLgYjHKJjtyhMcZ5k",
    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: 2525,
    SMTP_USER: "f5e4eed48957fc",
    SMTP_PASS: "56e97bf6f83a15",
    SMTP_FROM_NAME: "bookIt",
    SMTP_FROM_EMAIL: "noreply@bookit.com",
    STRIPE_API_KEY:
      "pk_test_51JP61kKdYfcVMwHw2V3wS32oFPZZxINq3Eu2ZPjrWnqB2X0oecvc59sL31wL55kGayGtJfM9SbXC1m544JNCbvY000l2SQetOf",
    STRIPE_SECRET_KEY:
      "sk_test_51JP61kKdYfcVMwHwADAgEIbKKqdzGmju6tkkUqEzZXtO9QT7thcDa516q9qGNzp3zkwqN24yIFWSoSDYpLLKKaCx00F4tXvTR6",
    STRIPE_WEBHOOK_SECRET: "whsec_8MMMJxZICbU5z7WlOw9R5cacdF0Xut6w",

    NEXTAUTH_URL = "https://senbookit.vercel.app"
    // STRIPE_WEBHOOK_SECRET: "whsec_o4x6X8hL9uov6Zm3V7BYBreO2Tr0a8KC" old one,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
