"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  selectedActionsAtom,
  uniqueChannelsAtom,
  recommendationFlagAtom,
} from "./atoms";
import { Action, FormInputs } from "./types";
import { formSchema } from "./validation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DatePickerWithRange } from "./date-range-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const MyForm: React.FC<{ actions: Action[] }> = ({ actions }) => {
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channels: {},
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = form;

  const [selectedActions, setSelectedActions] = useAtom(selectedActionsAtom);
  const channels = useAtom(uniqueChannelsAtom)[0];
  const [recommendationFlag, setRecommendationFlag] = useAtom(
    recommendationFlagAtom
  );

  const watchActions = watch("actions");
  const watchRecommendationFlag = watch("recommendationFlag");

  useEffect(() => {
    setSelectedActions(watchActions || []);
  }, [watchActions, setSelectedActions]);

  useEffect(() => {
    setRecommendationFlag(watchRecommendationFlag || false);
  }, [watchRecommendationFlag, setRecommendationFlag]);

  // Ensure dynamic inputs have a default value of 1
  useEffect(() => {
    if (channels.length > 0) {
      const currentValues = getValues("channels") || {};
      const newValues = { ...currentValues };

      channels.forEach((channel) => {
        if (!newValues[channel]) {
          newValues[channel] = 1;
        }
      });

      setValue("channels", newValues);
    }
  }, [channels, setValue, getValues]);

  const onSubmit = (data: FormInputs) => {
    const apiData = {
      ...data,
      validity: data.validity.map(
        (date) => date.toISOString().split("T")[0]
      ) as [string, string],
    };
    console.log(apiData);
    // Call your API with apiData
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Save Data</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  {...register("description")}
                  placeholder="Enter description"
                />
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="validity"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Validity</FormLabel>
                      <DatePickerWithRange
                        value={
                          field.value
                            ? { from: field.value[0], to: field.value[1] }
                            : undefined
                        }
                        onChange={(range) => {
                          if (range) {
                            setValue("validity", [range.from!, range.to!] as [
                              Date,
                              Date
                            ]);
                          }
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {errors.validity && (
                  <span className="text-red-500">
                    {errors.validity.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="actions">Actions</Label>
                <Controller
                  name="actions"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={actions}
                      isMulti
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value.toString()}
                    />
                  )}
                />
                {errors.actions && (
                  <span className="text-red-500">{errors.actions.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="recommendationFlag"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enable Recommendations
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {errors.recommendationFlag && (
                  <span className="text-red-500">
                    {errors.recommendationFlag.message}
                  </span>
                )}
              </div>

              {watchRecommendationFlag && (
                <div>
                  {channels.length > 0 &&
                    channels.map((channel, index) => (
                      <div className="grid gap-2 py-2" key={index}>
                        <Label htmlFor={`channels.${channel}`}>{channel}</Label>
                        <Input
                          type="number"
                          id={`channels.${channel}`}
                          {...register(`channels.${channel}`, {
                            valueAsNumber: true,
                            validate: (value) => value >= 0 && value <= 99,
                          })}
                          defaultValue={1}
                        />
                        {errors.channels?.[channel] && (
                          <span className="text-red-500">
                            {errors.channels[channel]?.message}
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              )}

              <Button type="submit" className="w-full">
                SUBMIT DATA
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MyForm;
