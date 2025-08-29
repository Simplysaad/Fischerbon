export default function errorMiddleware(req, res, err, next) {
  console.error(err);
}

