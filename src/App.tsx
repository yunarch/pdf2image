import { AddFilesBtn } from './components/AddFilesBtn';
import { ClearQueueBtn } from './components/ClearQueueBtn';
import { DownloadAllBtn } from './components/DownloadAllBtn';
import { DownloadAllCombineImagesBtn } from './components/DownloadAllCombineImagesBtn';
import { FilesQueue } from './components/FilesQueue';
import { HeaderButtons } from './components/HeaderButtons';
import { ModesSelector } from './components/ModesSelector';
import { Pdf2ImageContextProvider } from './providers/Pdf2ImageContextProvider';

export const App = () => {
  return (
    <div className="min-h-svh w-full bg-gray-100 dark:bg-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="relative flex justify-between gap-4">
          <h1 className="text-2xl font-bold">PDF 2 image</h1>
          <HeaderButtons />
        </header>
        <section className="my-8">
          <p>
            Simple web application that allows users to easily convert PDF files
            to images and images to PDF format, all within the web browser.
            <br />
            The app is designed with privacy and simplicity in mind, no files
            are uploaded or sent to any server. All processing happens locally
            in the user's browser by using web workers.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <Pdf2ImageContextProvider>
              <ModesSelector />
              <div className="flex flex-wrap justify-between gap-3">
                <div className="flex grow items-center gap-3">
                  <AddFilesBtn />
                  <ClearQueueBtn />
                </div>
                <div className="hidden grow items-center justify-end gap-3 has-[button]:flex">
                  <DownloadAllBtn />
                  <DownloadAllCombineImagesBtn />
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
                <FilesQueue />
              </div>
            </Pdf2ImageContextProvider>
          </div>
        </section>
      </div>
    </div>
  );
};
