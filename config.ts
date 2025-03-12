export const getMongoUri = () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('❌ MONGO_URI is not defined in the environment variables');
  }
  return mongoUri;
};
