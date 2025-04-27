export const GSTDetails = () => {
  return (
    <div className="sticky fixed bottom-0 left-0 w-full bg-[#16163f] text-white shadow-lg z-40">
      <div className="container mx-auto py-2 px-4">
        <div className="flex justify-between items-center">
          {/* GST and Udyam/MSME Details */}
          <h1 className="text-sm sm:text-base font-medium text-center">
            <span className="text-brand-500 font-semibold">GSTIN: 27AAWPM0837H1ZA</span> &nbsp;|&nbsp;
            <span className="text-brand-500 font-semibold">Udyam/MSME No: MH-33-0208978</span>
          </h1>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            {/* Facebook Icon */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>

            {/* WhatsApp Icon */}
            <a
              href="https://wa.me/918452006089"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.123-.272-.198-.57-.347zM12.004 2.003c-5.523 0-10 4.478-10 10 0 1.768.462 3.462 1.337 4.966l-1.414 5.168 5.293-1.385c1.43.783 3.046 1.2 4.784 1.2 5.523 0 10-4.478 10-10s-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};