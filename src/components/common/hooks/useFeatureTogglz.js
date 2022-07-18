import { useEffect } from "react";
import { useState } from "react";
import featureTogglzService from "../services/featureTogglzService";

export default function useFeatureTogglz() {
    const [features, setFeatures] = useState({});

    useEffect(() => {
        featureTogglzService.fetchAll().then(features => {
            setFeatures(features);
        });
    }, []);

    return {
        features: features
    }
}
