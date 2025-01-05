import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { ConsoleConstructorOptions } from "console";
import MultiSelect, { StylesConfig } from "react-select";
import { createFiter, updateFilter } from "@/app/lib/actions/filters";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetchEtats, fetchFournisseurs } from "@/app/lib/data/ste_utils";
import { z } from "zod";
import { FilterSchema } from "@/app/lib/definition";

interface FormProps {
  filter?: z.infer<typeof FilterSchema>;
  openModal: boolean;
  setOpenModal: Function;
}

export default function Form({ openModal, setOpenModal, filter }: FormProps) {
  const router = useRouter();
  const etats = useSWR("fetchEtats", fetchEtats).data;
  const suppliers = useSWR("fetchFournisseurs", fetchFournisseurs).data;
  const SelectOptions: any = ["SOEX", "SOEX DUBAI", "SOEX PRO", "RECUTEX", "RECUTEX PRO"].map((supplier) => ({ label: supplier, value: supplier }));
  const defaultValue: any = filter?.filter_supplier.split("+").map((supplier) => ({ label: supplier, value: supplier }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    if (filter?.id) {
      await updateFilter(filter.id, formdata);
      toast("Votre filtre a bien été modifié.");
    } else {
      await createFiter(formdata);
      toast("Votre filtre a bien été créé.");
    }
    setOpenModal(false);
    router.refresh();
  }

  return (
    <Modal size="xl" onClose={() => setOpenModal(false)} show={openModal}>
      <form onSubmit={handleSubmit} className="*:mb-2">
        <Modal.Header>Nouveau Filtre</Modal.Header>
        <Modal.Body className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <div>
            <Label htmlFor="filter_name" value="Nom du filtre" />
            <TextInput id="filter_name" type="text" name="filter_name" autoFocus={true} defaultValue={filter?.filter_name} required />
          </div>
          <div>
            <Label htmlFor="filter_type" value="Type" />
            <Select id="filter_type" name="filter_type" defaultValue={filter?.filter_type}>
              <option value="0">MOUVEMENT COMPLET</option>
              <option value="1">CIBLAGE ARTICLE</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="filter_category" value="Categorie" />
            <Select id="filter_category" name="filter_category" defaultValue={filter?.filter_category}>
              <option value="">Tous</option>
              <option value="GROSSE BALLE">GROSSE BALLE</option>
              <option value="PETITE BALLE">PETITE BALLE</option>
            </Select>
          </div>
          <div>
            <Label value="Fournisseur(s)" />
            <MultiSelect
              isMulti
              options={SelectOptions}
              defaultValue={defaultValue}
              placeholder="Tous les fournisseurs"
              name="filter_supplier"
              isSearchable={false}
              styles={StyleMultiSelect}
            />
          </div>
          <div>
            <Label value="Poids du stock" htmlFor="filter_weight" />
            <Select id="stock_weight" name="filter_stock_weight" defaultValue={filter?.filter_stock_weight}>
              <option value="">Tous</option>
              <option value="+5t">Superieur à 5tonnes (+5t)</option>
              <option value="-5t">Inferieur à 5tonnes</option>
            </Select>
          </div>
          <div>
            <Label value="Marge" htmlFor="filter_marge" />
            <Select id="filter_marge" name="filter_marge" defaultValue={filter?.filter_marge}>
              <option value="">Tous</option>
              <option value="-15">-15</option>
              <option value="-30">-30</option>
              <option value="-50">-50</option>
              <option value="+50">+50</option>
              <option value="+75">+75</option>
            </Select>
          </div>
          <div>
            <Label value="État" htmlFor="filter_etat" />
            <Select id="filter_etat" name="filter_etat" defaultValue={filter?.filter_etat}>
              <option value="">Tous</option>
              {["A", "A+", "PP"].map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>
          <hr className="my-5 mx-0" />
          <div className="flex justify-end gap-x-2">
            <Button type="submit">Valider</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Annuler
            </Button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
}

const StyleMultiSelect: StylesConfig<ConsoleConstructorOptions> = {
  control: (s) => ({ ...s, backgroundColor: "#f9fafb", borderRadius: "0.5rem" }),
  option: (styles, { isDisabled, isFocused }) => {
    return {
      ...styles,
      color: isFocused ? "white" : "black",
      backgroundColor: isDisabled ? undefined : isFocused ? "orangered" : undefined,
      padding: "0px 10px",
    };
  },
};
