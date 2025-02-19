import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import { createActivity } from "../services/apiActivities";
import { updateGroup } from "../services/apiGroups";
import { useGroups } from "../services/useGroups";
import Button from "./Button";
import ButtonsContainer from "./ButtonsContainer";
import Initial from "./Initial";
import Spinner from "./Spinner";

const inputStyles = [
  "mb-2",
  "px-4",
  "py-4",
  "rounded-xl",
  "text-m",
  "bg-gray-100",
];

const DEFAULT_AMOUNT = 0;

function FormActivity() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { groupId } = useParams();
  const { isLoading, groups } = useGroups();

  const [currentGroup] =
    groups?.filter((group) => +group.id === +groupId) || [];

  const { register, handleSubmit, watch, setValue, reset, formState } =
    useForm();

  const totalAmount = watch("activityAmount", DEFAULT_AMOUNT);
  useEffect(() => {
    if (currentGroup?.listParticipants?.length > 0) {
      const splitAmount = totalAmount / currentGroup.listParticipants.length;

      currentGroup.listParticipants.forEach((participant) => {
        setValue(`${participant.fullName}`, splitAmount.toFixed(2));
      });
    }
  }, [totalAmount, currentGroup, setValue]);

  // console.log(currentGroup.listParticipants);

  const { mutate: mutateCreatingActivity, isPending: isCreating } = useMutation(
    {
      mutationFn: createActivity,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["activities"] });
        toast.success("New activity successfully created");
        reset();
        navigate(`/expenses/${groupId}`);
      },
      onError: (err) => toast.error(err.message),
    }
  );

  const { mutate: mutateUpdatingGroup, isPending: isUpdating } = useMutation({
    mutationFn: updateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      // toast.success("Group successfully updated");
      // reset();
      // navigate(`/expenses/${groupId}`);
    },
    onError: (err) => console.error(err.message),
  });

  const { errors } = formState;

  if (isLoading) return <Spinner />;

  function onSubmit(data) {
    const formData = {
      groupId: groupId,
      activityTitle: data.activityTitle,
      totalPrice: data.activityAmount,
      activityPaidBy: data.paidBy,
      expenssList: Object.entries(data)
        .filter(
          ([key]) =>
            !["activityTitle", "paidBy", "activityAmount"].includes(key)
        )
        .map(([expenssOwner, price]) => ({
          expenssOwner,
          price: parseFloat(price),
        })),
    };

    mutateCreatingActivity(formData);

    const updatedList = currentGroup.listParticipants.map((participant) => ({
      ...participant,
      ...(participant.fullName === formData.activityPaidBy
        ? {
            delta:
              participant.delta +
              (+formData.totalPrice - +data[participant.fullName]),
          }
        : {
            delta: participant.delta - +data[participant.fullName],
          }),
    }));

    mutateUpdatingGroup({
      id: groupId,
      updatedGroup: { ...currentGroup, listParticipants: updatedList },
    });
  }
  function onError(errors) {
    // console.log(errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col justify-center mx-auto gap-1 px-1"
    >
      <h1>New Activity</h1>
      <label className="font-semibold" htmlFor="activityTitle">
        Title
      </label>
      <input
        className={inputStyles.join(" ")}
        id="activityTitle"
        type="text"
        placeholder="Title"
        disabled={isCreating || isUpdating}
        {...register("activityTitle", {
          required: "This field is required",
        })}
      />
      {errors?.activityTitle?.message && (
        <p className="px-4 mb-3 font-bold text-red-500">
          {errors.activityTitle.message}
        </p>
      )}

      <label className="font-semibold" htmlFor="paidBy">
        Paid by
      </label>
      <select
        className={inputStyles.join(" ")}
        name="paidBy"
        disabled={isCreating || isUpdating}
        {...register("paidBy", {
          required: "This field is required",
        })}
      >
        {currentGroup.listParticipants.map((participant) => (
          <option key={participant.id} value={participant.fullName}>
            {participant.fullName}
          </option>
        ))}
      </select>
      {errors?.paidBy?.message && (
        <p className="px-4 mb-3 font-bold text-red-500">
          {errors.paidBy.message}
        </p>
      )}

      <label className="font-semibold" htmlFor="activityAmount">
        Amount (MAD)
      </label>
      <input
        className={inputStyles.join(" ")}
        id="activityAmount"
        type="number"
        defaultValue={DEFAULT_AMOUNT}
        placeholder="Amount"
        disabled={isCreating || isUpdating}
        {...register("activityAmount", {
          required: "This field is required",
          min: { value: 1, message: "The amount must be greater than 1 MAD" },
        })}
      />
      {errors?.activityAmount?.message && (
        <p className="px-4 mb-3 font-bold text-red-500">
          {errors.activityAmount.message}
        </p>
      )}
      <div className="px-16">
        {currentGroup.listParticipants.map((participant) => (
          <div key={participant.id} className="flex items-center">
            <Initial>{participant.fullName}</Initial>
            <label htmlFor={participant.fullName} className="font-semibold">
              {participant.fullName}
            </label>
            <input
              className={`${inputStyles.join(" ")} ml-auto`}
              type="number"
              id={participant.fullName}
              defaultValue={DEFAULT_AMOUNT}
              {...register(`${participant.fullName}`, {
                required: "This field is required",
              })}
            />
            {errors?.[`${participant.fullName}`]?.message && (
              <p className="px-4 mb-3 font-bold text-red-500">
                {errors[`${participant.fullName}`].message}
              </p>
            )}
          </div>
        ))}
      </div>
      <ButtonsContainer>
        <Button disabled={isCreating || isUpdating} variation="primary">
          Save
        </Button>
        <Button variation="secondary">Cancel</Button>
      </ButtonsContainer>
    </form>
  );
}

export default FormActivity;
