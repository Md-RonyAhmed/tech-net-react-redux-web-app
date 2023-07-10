interface ErrorProps {
  error: string;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-white font-bold p-6 rounded-lg w-1/2 bg-red-500 text-center">{error}</p>
    </div>
  );
};

export default Error;
