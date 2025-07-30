import React, { useEffect, useState } from 'react'
import { fetchLanguage } from '../services/userINPservice'
import { Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);



const RepoLanguage = ({ name, owner }) => {

    const [languageData, setLanguagedata] = useState([]);

    useEffect(() => {
        repoLang()
    }, [name, owner])


    async function repoLang() {
        try {
            const lang = await fetchLanguage(name, owner);
            const percentage = calculateLanguagePercentages(lang.data);
            setLanguagedata(percentage)
        }
        catch (err) {
            console.log(err)
        }
    }

    const calculateLanguagePercentages = (languages) => {
        const totalBytes = Object.values(languages).reduce((sum, val) => sum + val, 0);
        return Object.entries(languages).reduce((acc, [lang, bytes]) => {
            acc[lang] = ((bytes / totalBytes) * 100).toFixed(2);
            return acc;
        }, {});
    };



    return (
        <div>
            <h2>{owner}/{name} - Language Breakdown</h2>
            <Doughnut
                data={{
                    labels: Object.keys(languageData),
                    datasets: [
                        {
                            data: Object.values(languageData),
                            backgroundColor: [
                                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                                '#FF9F40', '#C9CBCF'
                            ],
                        },
                    ],
                }}
            />
        </div>

    )
}

export default RepoLanguage