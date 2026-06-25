"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteSubCategory } from "../../services/subCategoriesService";

export default function DeleteSubCategoryModal() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const show = queryParams.has("deleteSubCategory");
  const rootCategoryId = params.rootCategoryId!;
  const subCategoryId = queryParams.get("subCategoryId")!;

  const queryClient = useQueryClient();

  const closeModal = () => {
    navigate(location.pathname, { replace: true });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deleteSubCategory,
    onError: (error) => {
      toast.error(error.message, { id: "errorDeleteSubCategory" });
    },
    onSuccess: (data) => {
      toast.success(data || "Sub categoría eliminada!", {
        id: "successDeleteSubCategory",
      });
      queryClient.invalidateQueries({
        queryKey: ["subCategories", rootCategoryId],
      });
      closeModal();
    },
  });

  return (
    <Transition show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* FONCO CON DESENFOQUE - Igual al de creación */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px]"
            aria-hidden="true"
          />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-8 text-left align-middle shadow-2xl transition-all border border-slate-100">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-xl font-bold text-gray-900 leading-tight"
                    >
                      Eliminar Sub-Categoría
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="flex flex-col text-sm text-gray-800 font-medium">
                        ¿Deseas eliminar esta categoria sub-categoria?{" "}
                        <span className="text-sm text-red-600 font-normal">
                          Si esta sub-categoria tiene productos asociados a
                          ella, no se eliminara.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => mutate({ rootCategoryId, subCategoryId })}
                    disabled={isPending}
                    className={`rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all hover:bg-red-700 active:scale-[0.98] ${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {isPending ? "Procesando..." : "Eliminar permanentemente"}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
