"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Steps will be imported here
import { StepRoleSelection } from "./StepRoleSelection";
import { StepGoals } from "./StepGoals";
import { StepTemplateSelect } from "./StepTemplateSelect";
import { StepCompletion } from "./StepCompletion";

export function OnboardingModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        role: "",
        goals: [] as string[],
        templateId: "",
    });
    const router = useRouter();

    const handleNext = () => setStep(step + 1);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const isComplete = localStorage.getItem("nexus_onboarding_complete");
        if (isComplete) {
            setIsOpen(false);
        }
    }, []);

    if (!mounted || !isOpen) return null;
    const handleComplete = () => {
        setIsOpen(false);
        localStorage.setItem("nexus_onboarding_complete", "true");
        router.push("/dashboard");
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <div className="w-full max-w-2xl bg-[#0c1018] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                    {/* Progress Bar */}
                    <div className="h-1 bg-white/5 w-full">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(step / 4) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <div className="p-8 min-h-[400px] flex flex-col">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <StepRoleSelection
                                    key="step1"
                                    value={userData.role}
                                    onChange={(role: string) => setUserData({ ...userData, role })}
                                    onNext={handleNext}
                                />
                            )}
                            {step === 2 && (
                                <StepGoals
                                    key="step2"
                                    values={userData.goals}
                                    onChange={(goals: string[]) => setUserData({ ...userData, goals })}
                                    onNext={handleNext}
                                    onBack={() => setStep(1)}
                                />
                            )}
                            {step === 3 && (
                                <StepTemplateSelect
                                    key="step3"
                                    role={userData.role}
                                    onSelect={(templateId: string) => setUserData({ ...userData, templateId })}
                                    onNext={handleNext}
                                    onBack={() => setStep(2)}
                                />
                            )}
                            {step === 4 && (
                                <StepCompletion
                                    key="step4"
                                    userData={userData}
                                    onComplete={handleComplete}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
