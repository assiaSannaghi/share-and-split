import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { usePosts } from "../context/PostContext";
import { createGroup } from "../services/apiGroups";
import Button from "./Button";
import ButtonsContainer from "./ButtonsContainer";

function FormGroup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { handleAddParticipant, participants } = usePosts();
  const inputStyles = [
    "mb-2",
    "py-4",
    "px-4",
    "rounded-xl",
    "text-m",
    " bg-gray-100",
  ];

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("New group successfully created");
      reset();
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const formData = {
      groupTitle: data.groupTitle,
      listParticipants: Object.entries(data)
        .filter(([key]) => key.startsWith("participant"))
        .map(([key, value], index) => ({
          id: index + 1,
          delta: 0,
          fullName: value,
        })),
    };
    mutate(formData);
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col justify-center mx-auto gap-1 px-1"
    >
      <h1>New Group</h1>
      <label className="font-semibold" htmlFor="groupTitle">
        Title
      </label>
      <input
        className={inputStyles.join(" ")}
        id="groupTitle"
        type="text"
        placeholder="Title"
        disabled={isCreating}
        {...register("groupTitle", {
          required: "This field is required",
        })}
      />
      {errors?.groupTitle?.message && (
        <p className="px-4 mb-3 font-bold text-red-500">
          {errors.groupTitle.message}
        </p>
      )}

      <div className="flex flex-col justify-center">
        <label className="font-semibold mb-1" htmlFor="participants">
          Participants
        </label>
        {participants.map((participant) => (
          <>
            <input
              className={inputStyles.join(" ")}
              placeholder="Participant name"
              type="text"
              aria-labelledby="participants"
              disabled={isCreating}
              id={`participant${participant.id}`}
              key={participant.id}
              {...register(`participant${participant.id}`, {
                required: "This field is required",
              })}
            />
            {errors?.[`participant${participant.id}`]?.message && (
              <p className="px-4 mb-3 font-bold text-red-500">
                {errors[`participant${participant.id}`].message}
              </p>
            )}
          </>
        ))}

        <button
          className="text-lg cursor-pointer font-semibold text-yellow-400 mb-5 py-1 text-left hover:underline "
          onClick={(e) => handleAddParticipant(e)}
        >
          Add participant
        </button>
      </div>

      <ButtonsContainer>
        <Button disabled={isCreating} variation="primary">
          Save
        </Button>
        <Button variation="secondary">Cancel</Button>
      </ButtonsContainer>
    </form>
  );
}

export default FormGroup;
